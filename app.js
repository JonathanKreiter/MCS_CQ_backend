const express = require('express');
const logger = require('morgan');
const cqSearchRouter = require('./cqSearchRouter');
const cors = require('cors');
const multer = require('multer')();

const app = express();

app.use(cors());
app.use(logger('combined'));

// for parsing application/x-www-form-urlencoded
app.use(
	express.urlencoded({
		extended: true,
	}),
);

// for parsing multipart/form-data
app.use(multer.array());

app.use('/', cqSearchRouter);

module.exports = app;
