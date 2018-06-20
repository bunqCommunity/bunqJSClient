const BunqJSClient = require('@bunq-community/bunq-js-client').default;
const JSONStore = require('json-store');
const LocalStorage = JSONStore(__dirname+'\\storage.json');

const ENCRYPTION_KEY = "3c7a4d431a846ed33a3bb1b1fa9b5c26";
const API_KEY = "sandbox_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // replace with your sandbox API-key
const DEVICE_NAME = "NodeTest";
const ENVIRONMENT = "SANDBOX"; // OR you can use PRODUCTION
const PERMITTED_IPS = []; // empty array if you're not sure

BunqClient = new BunqJSClient(LocalStorage);

async function setup() {
	// run the bunq application with our API key
	await BunqClient.run(API_KEY, PERMITTED_IPS, ENVIRONMENT, ENCRYPTION_KEY)
	.catch(exception => {
		throw exception;
	});
	
	// install a new keypair 
	await BunqClient.install()
	.catch(exception => {
		throw exception;
	});
	
	// register this device
	await BunqClient.registerDevice(DEVICE_NAME)
	.catch(error => {
		throw error.response.data;
	});

	// register a new session
	await BunqClient.registerSession()
	.catch(error => {
		throw error.response.data;
	});
}


async function getUsers() {
	// register a new session
	await BunqClient.registerSession()
	.catch(error => {
		throw error.response.data;
	});
	
	// get users
	const users = await BunqClient.getUsers(true)
	.catch(error => {
		throw error;
	});
	
	return users;
}


// run setup and get users 
setup().then(setup => {
	getUsers().then(users => {
		// show users in console
		console.log(users);
		process.exit();
	}).catch(error => {
		console.log(error);
	});	
}).catch(error => { 
	console.log(error);
});
