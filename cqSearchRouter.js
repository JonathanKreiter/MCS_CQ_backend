const express = require('express');
const cqSearchRouter = express.Router();
const { query_db } = require('./psql_db/index');


cqSearchRouter.get('/', async (req, res) => { 

	console.log('here?');
	try {
		console.log('here');
		let result = await query_db(req.query);
		const defendant_data = result.rows.length > 1 ? result.rows : result.rows[0];
		console.log('def data: ', defendant_data);
		res.status(200).json({ defendant_data });
	} catch (error) {
		//next(error);
		console.log('catch error:', error);
		res.sendStatus(500);
	}
})




// cqSearchRouter.post('/', async (req, res, next) => {
// 	res.status(202);
// 	let data = { ...req.body };


// });

module.exports = cqSearchRouter;
