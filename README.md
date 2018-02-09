# BunqJSClient ![build status for master branch](https://api.travis-ci.org/BunqCommunity/BunqJSClient.svg?branch=master)
A web based project that is aimed at allowing single page applications to do all interactions with Bunq without proxying through other services. 
All data is stored client-side and requests are created and signed using [forge](https://github.com/digitalbazaar/forge).

On its own the BunqJSClient doesn't do anything, you'll need to build an interface around it like we do with [BunqDesktop](https://github.com/BunqCommunity/BunqDesktop).

This project is focussed on the browser and isn't officially supported yet for usage with NodeJS servers. 

## Installation
Install the library
```bash
yarn add @bunq-community/bunq-js-client
```
Next create a new instance with an optional storage interface as the first parameter. 
This defaults to [store.js](https://github.com/marcuswestin/store.js/) but any class 
with the following methods: `get(key)`, `set(key, data)`, `remove(key)`. This library 
supports Promises in the storage interface now!
```js
import SomeStorageHelper from "some-storage-handler"; 

const BunqClientCustom = new BunqJSClient(SomeStorageHelper);

// OR use the default store.js
const BunqClient = new BunqJSClient();
```
Next run the setup basic functions to get started
```js
/**
* A 16-byte encryption key
* @see https://github.com/digitalbazaar/forge#pkcs5
*/
const ENCRYPTION_KEY = "3c7a4d431a846ed33a3bb1b1fa9b5c26";
const API_KEY = "abcd-1234-abcd-1234";
const DEVICE_NAME = "My Device";
const ENVIRONMENT = "SANDBOX"; // OR you can use PRODUCTION
const PERMITTED_IPS = []; // empty array if you're not sure

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
```

## Supported APIs
For more details I suggest you look into the endpoints found at `src/Api/*`

#### Attachments
- [GET /attachment-public/{imageUUID}/content](https://doc.bunq.com/api/1/call/attachment-public-content/method/list)

#### Bunq.me tabs
- [GET /v1/user/{userId}/monetary-account/{monetaryAccountId}/bunqme-tabs/{tabId}](https://doc.bunq.com/api/1/call/bunq-me-tab/method/get)
- [LIST /v1/user/{userId}/monetary-account/{monetaryAccountId}/bunqme-tabs](https://doc.bunq.com/api/1/call/bunq-me-tab/method/list)
- [POST /v1/user/{userId}/monetary-account/{monetaryAccountId}/bunqme-tabs](https://doc.bunq.com/api/1/call/bunq-me-tab/method/post)

#### Device-server
- [POST /v1/device-server](https://doc.bunq.com/api/1/call/installation/method/post)

#### Installation
- [POST /v1/installation](https://doc.bunq.com/api/1/call/installation/method/post)

#### Master Card Action
- [GET /v1/user/{userId}/monetary-account/{monetaryAccountId}/mastercard-action/{masterCardActionId}](https://doc.bunq.com/api/1/call/master-card-action/method/get)
- [LIST /v1/user/{userId}/monetary-account/{monetaryAccountId}/mastercard-action](https://doc.bunq.com/api/1/call/master-card-action/method/list)

#### MonetaryAccounts
- [GET /v1/user/{userId}/monetary-account/{monetaryAccountId}](https://doc.bunq.com/api/1/call/monetary-account/method/get)
- [LIST /v1/user/{userId}/monetary-account](https://doc.bunq.com/api/1/call/monetary-account/method/list)

#### Payment
- [GET /v1/user/{userId}/monetary-account/{monetaryAccountId}/payment/{paymentId}](https://doc.bunq.com/api/1/call/payment/method/get)
- [LIST /v1/user/{userId}/monetary-account/{monetaryAccountId}/payment](https://doc.bunq.com/api/1/call/request-inquiry/method/list)
- [POST /v1/user/{userId}/monetary-account/{monetaryAccountId}/payment](https://doc.bunq.com/api/1/call/request-inquiry/method/post)

#### Request inquiry
- [POST /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-inquiry](https://doc.bunq.com/api/1/call/request-inquiry/method/post)
- [PUT /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-inquiry/{requestInquiryId}](https://doc.bunq.com/api/1/call/request-inquiry/method/put)
- [GET /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-inquiry/{requestInquiryId}](https://doc.bunq.com/api/1/call/request-inquiry/method/get)
- [LIST /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-inquiry](https://doc.bunq.com/api/1/call/request-inquiry/method/list)

#### Request response
- [PUT /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-response/{requestResponseId}](https://doc.bunq.com/api/1/call/request-response/method/put)
- [GET /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-response/{requestResponseId}](https://doc.bunq.com/api/1/call/request-response/method/get)
- [LIST /v1/user/{userId}/monetary-account/{monetaryAccountId}/request-response](https://doc.bunq.com/api/1/call/request-response/method/list)

#### Session
- [DELETE /v1/session/{sessionId}](https://doc.bunq.com/api/1/call/session/method/delete)

#### Session-server
- [POST /v1/session-server](https://doc.bunq.com/api/1/call/session-server/method/post)
