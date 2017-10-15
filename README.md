# BunqJSClient

This project is aimed at allowing single page applications to do all interactions with Bunq on the client. 
Once you run the code it should store data in the browser and do requests directly to Bunq.

On its own the BunqJSClient doesn't do anything, you'll need to build an interface around it like we do with [BunqWeb](https://github.com/DennisSnijder/BunqWeb).

This project is focussed on the browser and isn't officially supported in the browser. 
We use [Dynamic Imports](https://babeljs.io/docs/plugins/syntax-dynamic-import/) and es2016/es7 syntax. 

*I highly recommend using webpack 3.6 to compile your project when using this SDK.*

## Installation
```bash
yarn add bunq-js-client  --dev
```
Import the client and setup a new client instance
```js
import BunqJSClient from "bunq-js-client";

const Client = new BunqJSClient({
    apiKey: "your-api-key",
    allowedIps: ["0.0.0.0"]
});
```