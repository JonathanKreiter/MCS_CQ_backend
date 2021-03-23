const express = require('express');
const logger = require('morgan');
const cqSearchRouter = require('./cqSearchRouter');
const cors = require('cors');
const multer = require('multer')();


const app = express();

app.use(cors());
app.use(logger('short'));
app.use(express.static('./public'));



// for parsing application/x-www-form-urlencoded / POST ONLY
// app.use(
// 	express.urlencoded({
// 		extended: true,
// 	}),
// );

// for parsing multipart/form-data / POST ONLY
//app.use(multer.array());

app.use('/cqSearch', cqSearchRouter);

module.exports = app;
