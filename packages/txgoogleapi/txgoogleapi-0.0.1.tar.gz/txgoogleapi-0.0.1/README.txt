txgoogleapi
===========

This library allows accessing Google Data APIs in an asynchronous fashion
using the Twisted application framework.

Currently, very few APIs are actually implemented but adding APIs should be
rather trivial.


Implemented APIs
----------------

 - Google URL shortener
 - YouTube Data API v3
   - Playlists
   - PlaylistItems


Requesters
----------

Google APIs are usually accessed using either OAuth 2.0 authentication or
by adding an API key to the query string. txgoogleapi provides utility
classes for both these scenarios.

txgoogleapi.unauth_requester  - Unauthenticated API access
txgoogleapi.api_key_requester - Authentication using an API key
txgoogleapi.oauth_requester   - Authentication using OAuth 2.0


Usage
-----

from twisted.internet import defer
from twisted.internet.task import react
import txgoogleapi


requester = txgoogleapi.ApiKeyRequester(YOUR_API_KEY)
google = txgoogleapi.Google(requester)


@defer.inlineCallbacks
def main(reactor):
    result = yield google.urlshortener.url.insert(body={
        'longUrl': 'http://github.com',
    })
    print 'Short url:', result['id']

react(main)
