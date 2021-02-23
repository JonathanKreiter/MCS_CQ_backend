const cqSearchRouter = require('express').Router();
const validateInputs = require('./validation/cqSearchValidation');

// cqSearchRouter.post('/', (req, res) => {
// 	console.log(`SUBMITTED ON: ${new Date()}`);
// 	console.log(req.body);
// 	console.log(
// 		'Content-Type:',
// 		req.rawHeaders[
// 			req.rawHeaders.indexOf('content-type' || 'Content-Type') + 1
// 		],
// 	);
// 	res.status(200).end();
// });

cqSearchRouter.post('/', (req, re, next) => {
	res.status(202); // accepted status, meaning request obj has been receieved, but nothing has been done with it yet.
	let reqData = req.body;
	// let output = validateInputs(reqData);

	// // fix this so whatever the condition is, it can meet it if validation criteria aren't met
	// if (output === 'error') {
	// 	res
	// 		.status(400)
	// 		.json({ errorMessage: 'Incorrect syntax. Please try again' });
	// }
	// const resultsObj = queryDB(output);
	// res.status(200).json(resultsObj).end();
});

module.exports = cqSearchRouter;
