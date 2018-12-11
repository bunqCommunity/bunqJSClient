# bunqJSClient 
[![NPM  Version](https://img.shields.io/npm/v/@bunq-community/bunq-js-client.svg) ](https://github.com/@bunq-community/bunq-js-client)
[![NPM Downloads](https://img.shields.io/npm/dt/@bunq-community/bunq-js-client.svg) ](https://www.npmjs.com/package/@bunq-community/bunq-js-client)
[![build status for master branch](https://api.travis-ci.org/bunqCommunity/bunqJSClient.svg?branch=master) ](https://travis-ci.org/bunqCommunity/bunqJSClient)
[![MIT License](https://img.shields.io/npm/l/@bunq-community/bunq-js-client.svg)](https://github.com/bunqCommunity/bunqJSClient/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/bunqCommunity/bunqJSClient/branch/master/graph/badge.svg) ](https://codecov.io/gh/bunqCommunity/bunqJSClient)

A unofficial javascript SDK for the bunq API. It is aimed at allowing single page applications to do all interactions with bunq without proxying through other services. 

The API session details are encrypted and stored using [forge](https://github.com/digitalbazaar/forge).

This project was originally built for the browser but has since then been tested and used with NodeJS servers. If you do want to use NodeJS you can still easily create a custom storage handler (with the default being Localstorage) like described in the [installation](#installation) section.

## Installation
Install the library
```bash
yarn add @bunq-community/bunq-js-client
```

Next create a new instance with an optional storage interface as the first parameter. This defaults to [store.js](https://github.com/marcuswestin/store.js/) but any class 
with the following methods: `get(key)`, `set(key, data)`, `remove(key)`.

## Usage
Install a storage helper if required and create a new client
```js
const bunqJSClient = new BunqJSClient();

// OR use a custom storage handler
import SomeStorageHelper from "some-storage-handler"; 
const bunqJSClientCustom = new bunqJSClient(SomeStorageHelper);

// disables the automatic requests to keep the current session alive
// instead it'll create a new session when it is required
bunqJSClient.setKeepAlive(false);
```

Next run the setup functions to get started
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

/**
 * Permitted IPs
 * When you set your current IP address followed by a "*" you will enable
 * wildcard mode for that session. You should usually let the user set
 * this manually in the app but it is possible.
 *
 * Leave the array empty if you're not sure and bunq will register the IP
 * used to send the request
 */
const PERMITTED_IPS = []; 

const setup = async () => {
    // run the bunq application with our API key
    await bunqJSClient.run(API_KEY, PERMITTED_IPS, ENVIRONMENT, ENCRYPTION_KEY);
    
    // install a new keypair 
    await bunqJSClient.install();
    
    // register this device
    await bunqJSClient.registerDevice(DEVICE_NAME);
    
    // register a new session
    await bunqJSClient.registerSession();
}
```

Now you can use the API in the bunq client to do requests and get the current users.
```js
// force that the user info is retrieved from the API instead of local cache version
const forceUpdate = true;

// all users connected to the api key
const users = await bunqJSClient.getUsers(forceUpdate);

// get only the userCompany account if one is set
const userCompany = await bunqJSClient.getUser("UserCompany", forceUpdate);

// get all payments for a user and monetary account
const payments = await bunqJSClient.api.payment.list(userId, accountId);
```

## OAuth authentication
You can use the helper function to format a correct url to start the login flow:
```js
const url = bunqJSClient.formatOAuthAuthorizationRequestUrl(
    clientId, 
    redirectUri, 
    optionalState = false
);
```

Next when the user grants access use the returned code parameter with:
```js
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
For more details look into the endpoints found at `src/Api/*`. 

Currently the only missing features are:

 - Sending requests to the encrypted endpoints. For example the PUT `/user/{userId}/card` endpoint

## Contact
[![Telegram chat badge](https://img.shields.io/badge/Telegram-Discuss-blue.svg) ](https://t.me/bunqcommunity)

We have a public [Telegram chat group ](https://t.me/bunqcommunity). Feel free to create a new issue for any suggestions, bugs or general ideas you have on Github or contact us through one of the above.

## Contributors ![Contributer count](https://img.shields.io/github/contributors/bunqcommunity/bunqjsclient.svg)

[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/0)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/0)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/1)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/1)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/2)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/2)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/3)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/3)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/4)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/4)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/5)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/5)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/6)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/6)[![](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/images/7)](https://sourcerer.io/fame/crecket/bunqCommunity/bunqJSClient/links/7)
