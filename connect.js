const { Client } = require('pg');
require('dotenv').config();
//const queryFunc = require('./dbQuery');

const client = new Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PS,
	port: process.env.DB_PORT,
});

const connection = async () => {
	try {
		await client.connect();
		console.log('CONNECTED TO POSTGRES');
	} catch (err) {
		console.log(`COULD NOT CONNECT: ${err}`);
	}
};

const query = `
SELECT 
    * 
FROM 
    defendants;
`;

const queryFunc = async (query) => {
	try {
		const res = await client.query(query);
		console.log(res.rows);
	} catch (err) {
		console.log(err.stack);
	} finally {
		client.end();
	}
};

//queryFunc(query);

module.exports = connection;
