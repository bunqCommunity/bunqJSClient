require("dotenv").config();

const setup = require("./setup_files/setup");


const defaultErrorLogger = error => {
	throw error;
};

const toCard = cardObject => {
	// Sily way to get card object and avoid: card[0]["CardDebit"]["key"]
	const card = cardObject[Object.keys(cardObject)[0]]
	return card
}

// Some functions are commented out so no accidental things happen such as a request of a new card or change of pincode

setup()
	.then(async (BunqClient) => {
		// get user info connected to this account
		const users = await BunqClient.getUsers(true);
		const userInfo = users[Object.keys(users)[0]];

		const accounts = await BunqClient.api.monetaryAccount.list(userInfo.id).catch(defaultErrorLogger)

		const cards = await BunqClient.api.card.list(userInfo.id).catch(defaultErrorLogger)
		const card = toCard(cards[Object.keys(cards)[0]])

		let cardId = card["id"];

		let mainAccountId = accounts[0]["MonetaryAccountBank"]["id"];
		let secondAccountId = accounts[1]["MonetaryAccountBank"]["id"]; // Assumes user has at least 2 monetary accounts
		let activationCode = "123456"
		let amount = {
			value: "1.00",
			currency: "EUR"
		};
		const assign = [{
			type: "PRIMARY",
			//pin_code: "1334", // Not mandatory
			monetary_account_id: secondAccountId
		}];

		const mainAccount = await BunqClient.api.monetaryAccount.get(userInfo.id, mainAccountId).catch(defaultErrorLogger);
		const testAccount = await BunqClient.api.monetaryAccount.get(userInfo.id, secondAccountId).catch(defaultErrorLogger);
		let mainAlias = {
			type: mainAccount.MonetaryAccountBank.alias[0].type,
			value: mainAccount.MonetaryAccountBank.alias[0].value,
			name: mainAccount.MonetaryAccountBank.alias[0].name
		}
		let testAlias = {
			type: testAccount.MonetaryAccountBank.alias[0].type,
			value: testAccount.MonetaryAccountBank.alias[0].value,
			name: testAccount.MonetaryAccountBank.alias[0].name
		}

		// Activate card
		// STATUS: Untested
		// const activate = await BunqClient.api.card.update(userInfo.id, cardId, null, activationCode).catch(defaultErrorLogger);
		// console.log("\nActivation: ", activate, "\n");

		// Check if activated card
		// STATUS: Tested on production
		const activatedCard = await BunqClient.api.card.get(userInfo.id, cardId).catch(error => {
			throw error;
		});
		console.log("\nCard: ", toCard(activatedCard[0])["status"], "\n");

		// Change pinCode
		// STATUS: Does not respond with succes or an error if too simple (pinassignment works for changing pincode)
		// const pinCode = await BunqClient.api.card.update(userInfo.id, cardId, "1234").catch(defaultErrorLogger)
		// console.log("\nPinCode: ", pinCode, "\n");

		// Change card assignment
		// STATUS: Tested on production
		const assignment = await BunqClient.api.card.update(userInfo.id, cardId, null, null, null, null, null, null, assign).catch(defaultErrorLogger)
		console.log("\nAssignment: ", toCard(assignment[0])["pin_code_assignment"], "\n");

		// Set limits
		// STATUS: Tested on production
		// NOTE: This overides and sets the other limits: card_limit, card_limit_atm as well
		//		 There are two "CARD_LIMIT_POS_ICC" entries who refer to atm limit and daily card limit, not sure how update specific
		const limits = await BunqClient.api.card.update(userInfo.id, cardId, null, null, null, null, [{
			daily_limit: "350.00",
			currency: "EUR",
			type: "CARD_LIMIT_POS_ICC"
		}]).catch(defaultErrorLogger);
		console.log("\nLimit:", toCard(assignment[0])["limit"]);

		// New card limit
		// STATUS: tested on production
		// NOTE: This overides limit:CARD_LIMIT_POS_ICC
		const limit = await BunqClient.api.card.update(userInfo.id, cardId, null, null, null, {
			value: "45.00",
			currency: "EUR"
		}).catch(defaultErrorLogger)
		console.log("\nCard limit: ", toCard(limit[0])["card_limit"], "\n");

		// Set ATM limit
		// STATUS: tested on production
		const atmLimit = await BunqClient.api.card.update(userInfo.id, cardId, null, null, null, null, [{
			daily_limit: "30.00",
			currency: "EUR",
			type: "CARD_LIMIT_ATM"
		}]).catch(defaultErrorLogger);
		console.log("\nATM limit:", toCard(atmLimit[0])["card_limit_atm"]);

		// Card Debit
		// STATUS: tested on production
		// const newCard = await BunqClient.api.cardDebit.post(
		// 	userInfo.id,
		// 	"Cardholder", // Must match available names on endpoint card-name
		// 	"Description",
		// 	mainAlias,
		// 	"MAESTRO",
		// 	assign
		// );
		// console.log("\nNew card: ", newCard, "\n");

	})
	.catch(error => {
		if (error.response) {
			console.log(error.response.data);
		} else {
			console.log(error);
		}
	}).finally(() => process.exit());
