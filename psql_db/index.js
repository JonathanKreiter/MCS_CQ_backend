const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL, 
	ssl: { 
		rejectUnauthorized: false
	}
	// user: process.env.DB_USER,
	// host: process.env.DB_HOST,
	// database: process.env.DB_NAME,
	// password: process.env.DB_PS,
	// port: process.env.DB_PORT,
});

const connect_to_db = async () => {
	try {
		const connected = await pool.connect();
		console.log(`CONNECTED TO ${connected.database}`);
	} catch (err) {
		console.error('CANNOT CONNNECT TO DB');
	}
};

const query = `
SELECT 
	d.deft_id, 
	first_name, 
	last_name,
	dob,
	lang, 
	street, 
	apt, 
	city, 
	st, 
	zipcode, 
	country, 
	ssn, 
	cn.docket, 
	citation, 
	cbo, 
	coll_bal, 
	dso, 
	fare, 
	rest, 
	r11
FROM 
	defendants as d
LEFT JOIN case_numbers as cn 
	ON d.deft_id = cn.deft_id 
LEFT JOIN case_balance as cb
	ON cn.docket = cb.docket
LEFT JOIN alerts as a
	ON cn.docket = a.docket
WHERE`;


const query_db = (query_params) => {
	let newQuery = query;
	let props = Object.keys(query_params)
	let counter = 1;

	if (props.length === 1) {
		newQuery = newQuery.concat(`\n ${props[0]} = '${query_params[props[0]]}'`);
	} else if (props.length > 1) {
		for (let prop in query_params) {
			if (counter === props.length) {
				newQuery = newQuery.concat(`\n ${prop} = '${query_params[prop]}'`);
			} else {
				newQuery = newQuery.concat(`\n ${prop} = '${query_params[prop]}' AND`);
			}
			counter++; 
		}
	} else {
		return 'EMPTY QUERY PARAMS OBJECT ERROR';
	}

	newQuery = newQuery.concat(';');
	return pool.query(newQuery);
};

module.exports = {
	connect_to_db,
	query_db,
};
