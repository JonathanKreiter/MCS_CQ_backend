const { Console } = require('console');
const http = require('http');
const app = require('./app');
const connection = require('./connect');

const server = http.createServer(app);

server.listen(5000);
console.log('SERVER IS LIVE');
console.log('LISTENING ON PORT 5000');
connection().then(() => {
	console.log('--------------');
});
