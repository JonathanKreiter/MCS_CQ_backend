const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PS,
	port: process.env.DB_PORT,
});

const connect_to_db = async () => {
	try {
		const connected = await pool.connect();
		console.log(`CONNECTED TO ${connected.database}`);
	} catch (err) {
		console.err('CANNOT CONNNECT TO DB');
	}
};

const query_db = (select_statement) => pool.query(select_statement);

module.exports = {
	connect_to_db,
	query_db,
};
