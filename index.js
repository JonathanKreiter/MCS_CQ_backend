const http = require('http');
const app = require('./app');
const { connect_to_db } = require('./psql_db/index');
require('dotenv').config();

const server = http.createServer(app);

let port = process.env.PORT || 5000; 

server.listen(port, 'localhost', (error) => { 
	if (error) throw error;
	console.log('SERVER IS LIVE');
	console.log(`LISTENING ON PORT ${process.env.PORT}`);
});

connect_to_db().then(() => {
	console.log('--------------');
});
