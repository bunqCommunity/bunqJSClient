# bunqJSClient ![build status for master branch](https://api.travis-ci.org/bunqCommunity/bunqJSClient.svg?branch=master) [![codecov](https://codecov.io/gh/bunqCommunity/bunqJSClient/branch/master/graph/badge.svg)](https://codecov.io/gh/bunqCommunity/bunqJSClient)

A web based project that is aimed at allowing single page applications to do all interactions with bunq without proxying through other services. 
All data is stored client-side and requests are created and signed using [forge](https://github.com/digitalbazaar/forge).

On its own the bunqJSClient doesn't do anything, you'll need to build an interface around it like we do with [bunqDesktop](https://github.com/bunqCommunity/bunqDesktop).

This project is focussed on the browser and isn't officially supported yet for usage with NodeJS servers. If you do want to use NodeJS you can still easily create a custom storage handler (since the default is Localstorage right now) like described in the [installation](#installation) section.

## Installation
Install the library
```bash
yarn add @bunq-community/bunq-js-client
```

Next create a new instance with an optional storage interface as the first parameter. 
This defaults to [store.js](https://github.com/marcuswestin/store.js/) but any class 
with the following methods: `get(key)`, `set(key, data)`, `remove(key)`.

## Usage
Install a storage helper if required and create a new client
```js
import SomeStorageHelper from "some-storage-handler"; 

const BunqClientCustom = new bunqJSClient(SomeStorageHelper);

// OR use the default store.js which only works in a browser environment
const BunqClient = new bunqJSClient();

// disables the automatic requests to keep the current session alive
// instead it'll create a new session when it is required
BunqClient.setKeepAlive(false);
```

Next run the setup basic functions to get started
```js
/**
 * A 16-byte encryption key, check the examples (create_encryption_key.js) 
 * on how to create one
 * @see https://github.com/digitalbazaar/forge#pkcs5
 */
const ENCRYPTION_KEY = "3c7a4d431a846ed33a3bb1b1fa9b5c26";
const API_KEY = "abcd-1234-abcd-1234"; // Your bunq API key
/**
 * The device name which will show in the installation notification that bunq sends
 * this also lets users manage their keys more easily
 */ 
const DEVICE_NAME = "My Device"; 
const ENVIRONMENT = "SANDBOX"; // OR you can use PRODUCTION
const PERMITTED_IPS = []; // empty array if you're not sure, by defaul the current IP is used

const setup = async () => {
    // run the bunq application with our API key
    await BunqClient.run(API_KEY, PERMITTED_IPS, ENVIRONMENT, ENCRYPTION_KEY);
    
    // install a new keypair 
    await BunqClient.install();
    
    // register this device
    await BunqClient.registerDevice(DEVICE_NAME);
    
    // register a new session
    await BunqClient.registerSession();
}
```

Now you can use the API in the bunq client to do requests and get the current users.
```js
// force that the user info is retrieved from the API instead of local cache version
const forceUpdate = true;

// all users connected to the api key
const users = await BunqClient.getUsers(forceUpdate);

// get only the userCompany account if one is set
const userCompany = await BunqClient.getUser("UserCompany", forceUpdate);

// get all payments for a user and monetary account
const payments = await bunqJSClient.api.payment.list(userId, accountId);
```

## OAuth authentication
You can use the helper function to format a correct url to start the login flow:
```
const url = bunqJSClient.formatOAuthAuthorizationRequestUrl(
    clientId, 
    redirectUri, 
    optionalState = false
);
```

Next when the user grants access use the returned code parameter with:
```
const authorizationCode = await bunqJSClient.exchangeOAuthToken(
    clientId, 
    clientSecret, 
    redirectUri, 
    code, 
    grantType: string = "authorization_code",
    state: string | false = false
)
```

This will return the if successful `access_token` which is a valid API key. Using this key will give you access to the limited `UserApiKey` user object. For more details on the limitations of a OAuth connection check out the official together topic [here](https://together.bunq.com/d/3016-oauth).

## Examples
There are a few examples which can be found in the `examples/` folder. `create_sandbox_apikey` will create and output a new sandbox key which you can use with the other examples.

The example uses [dotenv](https://github.com/motdotla/dotenv) so make sure to copy the `.env.example` file to `.env` and enter the correct values.

## Supported APIs
For more details look into the endpoints found at `src/Api/*`

## Contributors

[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/0)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/0)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/1)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/1)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/2)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/2)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/3)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/3)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/4)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/4)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/5)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/5)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/6)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/6)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/7)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/7)
