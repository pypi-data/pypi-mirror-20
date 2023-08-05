###############################################################################
#
# The MIT License (MIT)
#
# Copyright (c) Crossbar.io Technologies GmbH
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
###############################################################################


from __future__ import absolute_import

import json
import binascii

import six

import txaio
txaio.use_twisted()

from twisted.internet.defer import Deferred, succeed, inlineCallbacks, returnValue, CancelledError
from twisted.internet import protocol
from twisted.web.client import Agent, HTTPConnectionPool
from twisted.web.iweb import IBodyProducer, UNKNOWN_LENGTH
from twisted.web.http_headers import Headers

import treq

from txaioetcd import KeySet, KeyValue, Header, Status, Deleted, \
    Revision, Error, Failed, Success, Range, Lease

from txaioetcd._types import _increment_last_byte

__all__ = (
    'Client',
)


class _BufferedSender(object):
    """
    HTTP buffered request sender for use with Twisted Web agent.
    """

    length = UNKNOWN_LENGTH

    def __init__(self, body):
        self.body = body
        self.length = len(body)

    def startProducing(self, consumer):
        consumer.write(self.body)
        return succeed(None)

    def pauseProducing(self):
        pass

    def stopProducing(self):
        pass


class _BufferedReceiver(protocol.Protocol):
    """
    HTTP buffered response receiver for use with Twisted Web agent.
    """
    def __init__(self, done):
        self._buf = []
        self._done = done

    def dataReceived(self, data):
        self._buf.append(data)

    def connectionLost(self, reason):
        # TODO: test if reason is twisted.web.client.ResponseDone, if not, do an errback
        if self._done:
            self._done.callback(b''.join(self._buf))
            self._done = None


class _StreamingReceiver(protocol.Protocol):
    """
    HTTP streaming response receiver for use with Twisted Web agent.
    """

    log = txaio.make_logger()

    SEP = b'\x0a'
    """
    A streaming response from the gRPC HTTP gateway of etcd3 will send
    JSON pieces separated by "newline".

    The exact separator used probably depends on the platform where
    etcd3 (the server) runs - not sure. But Unix newline works for me now.
    """

    def __init__(self, cb, done=None):
        """

        :param cb: Callback to fire upon a JSON chunk being received and parsed.
        :type cb: callable
        :param done: Deferred to fire when done.
        :type done: t.i.d.Deferred
        """
        self._buf = b''
        self._cb = cb
        self._done = done

    def dataReceived(self, data):
        self._buf += data
        while True:
            i = self._buf.find(self.SEP)
            if i > 0:
                data = self._buf[:i]
                try:
                    obj = json.loads(data.decode('utf8'))
                except Exception as e:
                    self.log.warn('JSON parsing of etcd streaming response from failed: {}'.format(e))
                else:
                    for evt in obj[u'result'].get(u'events', []):
                        if u'kv' in evt:
                            kv = KeyValue.parse(evt[u'kv'])
                            try:
                                self._cb(kv)
                            except Exception as e:
                                self.log.warn('exception raised from etcd watch callback {} swallowed: {}'.format(self._cb, e))

                self._buf = self._buf[i + len(self.SEP):]
            else:
                break

    def connectionLost(self, reason):
        self.log.debug('watch connection lost: {reason}', reason=reason)
        # FIXME: test if reason is twisted.web.client.ResponseDone, if not, do an errback
        # watch connection lost: [Failure instance: Traceback (failure with no frames): <class 'twisted.web._newclient.ResponseFailed'>: [<twisted.python.failure.Failure twisted.internet.error.ConnectionLost: Connection to the other side was lost in a non-clean fashion: Connection lost.>, <twisted.python.failure.Failure twisted.web.http._DataLoss: Chunked decoder in 'CHUNK_LENGTH' state, still expecting more data to get to 'FINISHED' state.>]
        if self._done:
            self._done.callback(reason)
            self._done = None


class _None(object):
    pass


class Client(object):
    """
    etcd Twisted client that talks to the gRPC HTTP gateway endpoint of etcd v3.

    See: https://coreos.com/etcd/docs/latest/dev-guide/apispec/swagger/rpc.swagger.json
    """

    log = txaio.make_logger()

    REQ_HEADERS = {
        'Content-Type': ['application/json']
    }
    """
    Default request headers for HTTP/POST requests issued to the
    gRPC HTTP gateway endpoint of etcd.
    """

    def __init__(self, reactor, url, pool=None):
        """

        :param rector: Twisted reactor to use.
        :type reactor: class

        :param url: etcd URL, eg `http://localhost:2379`
        :type url: str

        :param pool: Twisted Web agent connection pool
        :type pool:
        """
        if type(url) != six.text_type:
            raise TypeError('url must be of type unicode, was {}'.format(type(url)))
        self._url = url
        self._pool = pool or HTTPConnectionPool(reactor, persistent=True)
        self._pool._factory.noisy = False
        self._agent = Agent(reactor, connectTimeout=10, pool=self._pool)

    @inlineCallbacks
    def status(self):
        """
        Get etcd status.

        URL:     /v3alpha/maintenance/status

        :returns: The current etcd cluster status.
        :rtype: instance of txaioetcd.Status
        """
        url = u'{}/v3alpha/maintenance/status'.format(self._url).encode()
        obj = {
            # yes, we must provide an empty dict for the request!
        }
        data = json.dumps(obj).encode('utf8')

        response = yield treq.post(url, data, headers=self.REQ_HEADERS)
        obj = yield treq.json_content(response)

        status = Status.parse(obj)

        returnValue(status)

    @inlineCallbacks
    def set(self, key, value, lease=None, return_previous=None):
        """
        Set the value for the key in the key-value store.

        Setting a value on a key increments the revision
        of the key-value store and generates one event in
        the event history.

        URL:     /v3alpha/kv/put

        :param key: key is the key, in bytes, to put into
            the key-value store.
        :type key: bytes

        :param value: value is the value, in bytes, to
            associate with the key in the key-value store.
        :key value: bytes

        :param lease: Lease to associate the key in the
            key-value store with.
        :type lease: instance of Lease or None

        :param return_previous: If set, return the previous key-value.
        :type return_previous: bool or None

        :returns: Revision info
        :rtype: instance of Revision
        """
        if type(key) != six.binary_type:
            raise TypeError('key must be bytes, not {}'.format(type(key)))

        if type(value) != six.binary_type:
            raise TypeError('value must be bytes, not {}'.format(type(value)))

        if lease is not None and not isinstance(lease, Lease):
            raise TypeError('lease must be a Lease object, not {}'.format(type(lease)))

        if return_previous is not None and type(return_previous) != bool:
            raise TypeError('return_previous must be bool, not {}'.format(type(return_previous)))

        url = u'{}/v3alpha/kv/put'.format(self._url).encode()
        obj = {
            u'key': binascii.b2a_base64(key).decode(),
            u'value': binascii.b2a_base64(value).decode()
        }
        if return_previous:
            obj[u'prev_kv'] = True
        if lease and lease.lease_id:
            obj[u'lease'] = lease.lease_id

        data = json.dumps(obj).encode('utf8')

        response = yield treq.post(url, data, headers=self.REQ_HEADERS)
        obj = yield treq.json_content(response)

        revision = Revision.parse(obj)

        returnValue(revision)

    @inlineCallbacks
    def get(self,
            key,
            count_only=None,
            keys_only=None,
            limit=None,
            max_create_revision=None,
            min_create_revision=None,
            min_mod_revision=None,
            revision=None,
            serializable=None,
            sort_order=None,
            sort_target=None):
        """
        Range gets the keys in the range from the key-value store.

        URL:    /v3alpha/kv/range

        :param key: key is the first key for the range. If range_end is not given, the request only looks up key.
        :type key: bytes

        :param range_end: range_end is the upper bound on the requested range
            [key, range_end).\nIf range_end is '\\0', the range is all keys \u003e= key.
            If the range_end is one bit larger than the given key, then the range requests
            get the all keys with the prefix (the given key).\nIf both key and range_end
            are '\\0', then range requests returns all keys.
        :type range_end: bytes

        :param prefix: If set, and no range_end is given, compute range_end from key prefix.
        :type prefix: bool

        :param count_only: count_only when set returns only the count of the keys in the range.
        :type count_only: bool

        :param keys_only: keys_only when set returns only the keys and not the values.
        :type keys_only: bool

        :param limit: limit is a limit on the number of keys returned for the request.
        :type limit: int

        :param max_create_revision: max_create_revision is the upper bound for returned key create revisions; all keys with\ngreater create revisions will be filtered away.
        :type max_create_revision: int

        :param max_mod_revision: max_mod_revision is the upper bound for returned key mod revisions; all keys with\ngreater mod revisions will be filtered away.
        :type max_mod_revision: int

        :param min_create_revision: min_create_revision is the lower bound for returned key create revisions; all keys with\nlesser create trevisions will be filtered away.
        :type min_create_revision: int

        :param min_mod_revision: min_mod_revision is the lower bound for returned key mod revisions; all keys with\nlesser mod revisions will be filtered away.
        :type min_min_revision: int

        :param revision: revision is the point-in-time of the key-value store to use for the
            range. If revision is less or equal to zero, the range is over the newest
            key-value store. If the revision has been compacted, ErrCompacted is returned as
            a response.
        :type revision: int

        :param serializable: serializable sets the range request to use serializable
            member-local reads. Range requests are linearizable by default; linearizable
            requests have higher latency and lower throughput than serializable requests
            but reflect the current consensus of the cluster. For better performance, in
            exchange for possible stale reads,\na serializable range request is served
            locally without needing to reach consensus\nwith other nodes in the cluster.
        :type serializable: bool

        :param sort_order:
        :type sort_order:

        :param sort_target:
        :type sort_taget:
        """
        if type(key) == six.binary_type:
            key = KeySet(key)
        elif isinstance(key, KeySet):
            pass
        else:
            raise TypeError('key must either be bytes or a KeySet object, not {}'.format(type(key)))

        if key.type == KeySet.SINGLE:
            range_end = None
        elif key.type == KeySet.PREFIX:
            range_end = _increment_last_byte(key.key)
        elif key.type == KeySet.RANGE:
            range_end = key.range_end
        else:
            raise Exception('logic error')

        url = u'{}/v3alpha/kv/range'.format(self._url).encode()
        obj = {
            u'key': binascii.b2a_base64(key.key).decode()
        }
        if range_end:
            obj[u'range_end'] = binascii.b2a_base64(range_end).decode()

        data = json.dumps(obj).encode('utf8')

        response = yield treq.post(url, data, headers=self.REQ_HEADERS)
        obj = yield treq.json_content(response)

        result = Range.parse(obj)
        count = int(obj.get(u'count', 0))

        returnValue(result)

    @inlineCallbacks
    def delete(self, key, return_previous=None):
        """
        Delete value(s) from etcd.

        URL:     /v3alpha/kv/deleterange

        :param key: key is the first key to delete in the range.
        :type key: bytes or KeySet

        :param return_previous: If enabled, return the deleted key-value pairs
        :type return_previous: bool or None

        :returns: Deletion info
        :rtype: instance of txaioetcd.Deleted
        """
        if type(key) == six.binary_type:
            key = KeySet(key)
        elif isinstance(key, KeySet):
            pass
        else:
            raise TypeError('key must either be bytes or a KeySet object, not {}'.format(type(key)))

        if return_previous is not None and type(return_previous) != bool:
            raise TypeError('return_previous must be bool, not {}'.format(type(return_previous)))

        if key.type == KeySet.SINGLE:
            range_end = None
        elif key.type == KeySet.PREFIX:
            range_end = _increment_last_byte(key.key)
        elif key.type == KeySet.RANGE:
            range_end = key.range_end
        else:
            raise Exception('logic error')

        url = u'{}/v3alpha/kv/deleterange'.format(self._url).encode()
        obj = {
            u'key': binascii.b2a_base64(key.key).decode(),
        }
        if range_end:
            # range_end is the key following the last key to delete
            # for the range [key, range_end).
            # If range_end is not given, the range is defined to contain only
            # the key argument.
            # If range_end is one bit larger than the given key, then the range
            # is all keys with the prefix (the given key).
            # If range_end is '\\0', the range is all keys greater
            # than or equal to the key argument.
            #
            obj[u'range_end'] = binascii.b2a_base64(range_end).decode()

        if return_previous:
            # If prev_kv is set, etcd gets the previous key-value pairs
            # before deleting it.
            # The previous key-value pairs will be returned in the
            # delete response.
            #
            obj[u'prev_kv'] = True

        data = json.dumps(obj).encode('utf8')

        response = yield treq.post(url, data, headers=self.REQ_HEADERS)
        obj = yield treq.json_content(response)

        deleted = Deleted.parse(obj)

        returnValue(deleted)

    def watch(self, keys, on_watch, filters=None, start_revision=None, return_previous=None):
        """
        Watch one or more keys or key sets and invoke a callback.

        Watch watches for events happening or that have happened.
        The entire event history can be watched starting from the
        last compaction revision.

        URL:     /v3alpha/watch

        :param keys: Watch these keys / key sets.
        :type keys: list of bytes or KeySets
        :param on_watch: The callback to invoke upon receiving
            a watch event.
        :type on_watch: callable
        :param start_revision: start_revision is an optional
            revision to watch from (inclusive). No start_revision
            is \"now\".
        :type start_revision: int
        """
        d = self._start_watching(keys, on_watch, filters, start_revision, return_previous)

        def on_err(err):
            if err.type == CancelledError:
                # swallow canceling!
                pass
            else:
                return err

        d.addErrback(on_err)

        return d

    def _start_watching(self, keys, on_watch, filters, start_revision, return_previous):
        data = []
        headers = dict()
        url = u'{}/v3alpha/watch'.format(self._url).encode()

        # create watches for all key prefixes
        for key in keys:
            if type(key) == six.binary_type:
                key = KeySet(key)
            elif isinstance(key, KeySet):
                pass
            else:
                raise TypeError('key must be binary string or KeySet, not {}'.format(type(key)))

            if key.type == KeySet.SINGLE:
                range_end = None
            elif key.type == KeySet.PREFIX:
                range_end = _increment_last_byte(key.key)
            elif key.type == KeySet.RANGE:
                range_end = key.range_end
            else:
                raise Exception('logic error')

            obj = {
                'create_request': {
                    u'start_revision': start_revision,
                    u'key': binascii.b2a_base64(key.key).decode(),

                    # range_end is the end of the range [key, range_end) to watch.
                    # If range_end is not given,\nonly the key argument is watched.
                    # If range_end is equal to '\\0', all keys greater than nor equal
                    # to the key argument are watched. If the range_end is one bit
                    # larger than the given key,\nthen all keys with the prefix (the
                    # given key) will be watched.

                    # progress_notify is set so that the etcd server will periodically
                    # send a WatchResponse with\nno events to the new watcher if there
                    # are no recent events. It is useful when clients wish to recover
                    # a disconnected watcher starting from a recent known revision.
                    # The etcd server may decide how often it will send notifications
                    # based on current load.
                    u'progress_notify': True,
                }
            }
            if range_end:
                obj[u'create_request'][u'range_end'] = binascii.b2a_base64(range_end).decode()

            if filters:
                obj[u'create_request'][u'filters'] = filters

            if return_previous:
                # If prev_kv is set, created watcher gets the previous KV
                # before the event happens.
                # If the previous KV is already compacted, nothing will be
                # returned.
                obj[u'create_request'][u'prev_kv'] = True

            data.append(json.dumps(obj).encode('utf8'))

        data = b'\n'.join(data)

        # HTTP/POST request in one go, but response is streaming ..
        d = self._agent.request(b'POST',
                                url,
                                Headers(headers),
                                _BufferedSender(data))

        def handle_response(response):
            if response.code == 200:
                done = Deferred()
                response.deliverBody(_StreamingReceiver(on_watch, done))
                return done
            else:
                raise Exception('unexpected response status {}'.format(response.code))

        def handle_error(err):
            self.log.warn('could not start watching on etcd: {error}', error=err.value)
            return err

        d.addCallbacks(handle_response, handle_error)
        return d

    @inlineCallbacks
    def submit(self, txn):
        """
        Submit a transaction.

        Processes multiple requests in a single transaction.
        A transaction increments the revision of the key-value store
        and generates events with the same revision for every
        completed request.

        It is not allowed to modify the same key several times
        within one transaction.

        From google paxosdb paper:

        Our implementation hinges around a powerful primitive which
        we call MultiOp. All other database operations except for
        iteration are implemented as a single call to MultiOp.
        A MultiOp is applied atomically and consists of three components:

        1. A list of tests called guard. Each test in guard checks
           a single entry in the database. It may check for the absence
           or presence of a value, or compare with a given value.
           Two different tests in the guard may apply to the same or
           different entries in the database. All tests in the guard
           are applied and MultiOp returns the results. If all tests
           are true, MultiOp executes t op (see item 2 below), otherwise
           it executes f op (see item 3 below).

        2. A list of database operations called t op. Each operation in
           the list is either an insert, delete, or lookup operation, and
           applies to a single database entry. Two different operations
           in the list may apply to the same or different entries in
           the database. These operations are executed if guard evaluates
           to true.

        3. A list of database operations called f op. Like t op, but
           executed if guard evaluates to false.

        :param txn: The transaction to submit.
        :type txn: Transaction object
        :returns: An instance of Success or an exception of Failed or Error
        :rtype: Success, Failed, Error
        """
        url = u'{}/v3alpha/kv/txn'.format(self._url).encode()
        obj = txn.marshal()
        data = json.dumps(obj).encode('utf8')

        response = yield treq.post(url, data, headers=self.REQ_HEADERS)
        obj = yield treq.json_content(response)

        if u'error' in obj:
            error = Error.parse(obj)
            raise error

        if u'header' in obj:
            header = Header.parse(obj[u'header'])
        else:
            header = None

        responses = []
        for r in obj.get(u'responses', []):
            if len(r.keys()) != 1:
                raise Exception('bogus transaction response (multiple response tags in item): {}'.format(obj))

            first = list(r.keys())[0]

            if first == u'response_put':
                re = Revision.parse(r[u'response_put'])
            elif first == u'response_delete_range':
                re = Deleted.parse(r[u'response_delete_range'])
            elif first == u'response_range':
                re = Range.parse(r[u'response_range'])
            else:
                raise Exception('response item "{}" bogus or not implemented'.format(first))

            responses.append(re)

        if obj.get(u'succeeded', False):
            returnValue(Success(header, responses))
        else:
            raise Failed(header, responses)

    @inlineCallbacks
    def lease(self, time_to_live, lease_id=None):
        """
        LeaseGrant creates a lease which expires if the server does not
        receive a keepAlive within a given time to live period.

        All keys attached to the lease will be expired and deleted if
        the lease expires.

        Each expired key generates a delete event in the event history.

        HTTP/POST URL: /v3alpha/lease/grant

        :param time_to_live: TTL is the advisory time-to-live in seconds.
        :type time_to_live: int
        :param lease_id: ID is the requested ID for the lease.
            If ID is None, the lessor (etcd) chooses an ID.
        :type lease_id: int or None
        :returns: A lease object representing the created lease. This
            can be used for refreshing or revoking the least etc.
        :rtype: Lease object
        """
        if lease_id is not None and type(lease_id) not in six.integer_types:
            raise TypeError('lease_id must be integer, not {}'.format(type(lease_id)))

        if type(time_to_live) not in six.integer_types:
            raise TypeError('time_to_live must be integer, not {}'.format(type(time_to_live)))

        if time_to_live < 1:
            raise TypeError('time_to_live must >= 1 second, was {}'.format(time_to_live))

        obj = {
            u'TTL': time_to_live,
            u'ID': lease_id or 0,
        }
        data = json.dumps(obj).encode('utf8')

        url = u'{}/v3alpha/lease/grant'.format(self._url).encode()

        response = yield treq.post(url, data, headers=self.REQ_HEADERS)
        obj = yield treq.json_content(response)

        lease = Lease.parse(self, obj)

        returnValue(lease)
