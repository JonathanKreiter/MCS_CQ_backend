const cqSearchRouter = require('express').Router();
const { query_db } = require('./db/index');

//cqSearchRouter.use(validateInputs());

// cqSearchRouter.use('QUERY DB MIDDLEWARE GOES HERE AFTER VALIDATION');

// cqSearchRouter.use('RESPOND BACK TO CLIENT MIDDLWARE GOES HERE');

// cqSearchRouter.use('ERROR MIDDLEWARE GOES HERE');

cqSearchRouter.post('/', async (req, res, next) => {
	res.status(202);
	let data = req.body;

	let query_statement = `
	SELECT 
		*
	FROM 
		defendants
	WHERE 
		first_name = '${data['first_name'].toUpperCase()}'
	`;

	try {
		let result = await query_db(query_statement);

		const defendant_data = result.rows;
		console.log();
	} catch (error) {
		console.log(error);
	}
});

module.exports = cqSearchRouter;
