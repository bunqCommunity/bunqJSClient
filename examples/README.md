# Examples

## Getting started

Add your API details to the .env file by copying the .env.example file and filling in the empty values.

The examples use the same generic setup file found at `examples/common/setup.js`. It simply checks a few values in the environment variables and then runs the 5 startup functions which are always required.

Run any of the examples with `node examples/<example-name>.js`. Some examples require an account with specific account types or cards which will show when you attempt to run them.

## Examples

 - `basic.js` - The most basic example. Get the user info, monetary accounts and then fetch the payments for one of the monetary accounts.
 - `cards.js` - A collection of common actions involving cards.
 - `encrypted_endpoint.js` - Certain endpoints for the bunq API require an extra encryption layer. This example attempts to generate a new CVC code which is one of those encrypted endpoints. 
 - `file_upload.js` - Uploads a picture of Ali and then attempts to download it again.
 - `multiple_instances.js` - In some situations you might want to have multiple API keys active in their own client at the same time. This example shows the required steps in order to ensure that you do not go over the bunq API rate limit.
 - `order_card.js` - Order a card using the bunq API. (This might result in extra costs to pay for the cards!)
 - `proxy_example.js` - An experimental example which allows the user to set proxy servers. 