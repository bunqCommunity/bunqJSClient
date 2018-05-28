# BunqJSClient ![build status for master branch](https://api.travis-ci.org/BunqCommunity/BunqJSClient.svg?branch=master) [![codecov](https://codecov.io/gh/BunqCommunity/BunqJSClient/branch/master/graph/badge.svg)](https://codecov.io/gh/BunqCommunity/BunqJSClient)

A web based project that is aimed at allowing single page applications to do all interactions with bunq without proxying through other services. 
All data is stored client-side and requests are created and signed using [forge](https://github.com/digitalbazaar/forge).

On its own the BunqJSClient doesn't do anything, you'll need to build an interface around it like we do with [BunqDesktop](https://github.com/BunqCommunity/BunqDesktop).

This project is focussed on the browser and isn't officially supported yet for usage with NodeJS servers. If you do want to use NodeJS you can still easily create a custom storage handler (since the default is Localstorage right now) like described in the [installation](#installation) section.

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

// get all payments for a user and monetary account
const payments = await BunqJSClient.api.payment.list(userId, accountId);
```

## Supported APIs
For more details look into the endpoints found at `src/Api/*`

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/7481136?v=4" width="80px;"/><br /><sub><b>Gregory Goijaerts</b></sub>](https://github.com/Crecket)<br />[💻](https://github.com/BunqCommunity/BunqJSClient/commits?author=Crecket "Code") [🎨](#design-Crecket "Design") [📖](https://github.com/BunqCommunity/BunqJSClient/commits?author=Crecket "Documentation") [🚇](#infra-Crecket "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-Crecket "Reviewed Pull Requests") [📦](#platform-Crecket "Packaging/porting to new platform") [💬](#question-Crecket "Answering Questions") [🐛](https://github.com/BunqCommunity/BunqJSClient/issues?q=author%3ACrecket "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/5704510?v=4" width="80px;"/><br /><sub><b>Robbert Klarenbeek</b></sub>](https://github.com/robbertkl)<br />[💻](https://github.com/BunqCommunity/BunqJSClient/commits?author=robbertkl "Code") [🐛](https://github.com/BunqCommunity/BunqJSClient/issues?q=author%3Arobbertkl "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/6396615?v=4" width="80px;"/><br /><sub><b>basst85</b></sub>](https://github.com/basst85)<br />[🐛](https://github.com/BunqCommunity/BunqJSClient/issues?q=author%3Abasst85 "Bug reports") [💻](https://github.com/BunqCommunity/BunqJSClient/commits?author=basst85 "Code") | [<img src="https://avatars0.githubusercontent.com/u/9350879?v=4" width="80px;"/><br /><sub><b>Pascal Drewes</b></sub>](https://drewez.nl/)<br />[🐛](https://github.com/BunqCommunity/BunqJSClient/issues?q=author%3AWant100Cookies "Bug reports") [💻](https://github.com/BunqCommunity/BunqJSClient/commits?author=Want100Cookies "Code") | [<img src="https://avatars3.githubusercontent.com/u/3186640?v=4" width="80px;"/><br /><sub><b>Emile Bons</b></sub>](http://www.emilebons.nl)<br />[💻](https://github.com/BunqCommunity/BunqJSClient/commits?author=EmileBons "Code") |
| :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
