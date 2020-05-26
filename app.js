const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const apiRouter = require('./src/routes/index');

//Database connection
require('./src/configs/db');
//Access-Control-Allow-Origin
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiRouter);

module.exports = app;
