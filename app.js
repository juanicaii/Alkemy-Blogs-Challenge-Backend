const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const logError = require('./src/middlewares/logError');
const errorHanlder = require('./src//middlewares/errorHandler');
const cors = require('cors');
require('dotenv').config();

const postsRouter = require('./src/routes/posts');

const db = require('./src/db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/', postsRouter);
app.use(logError);
app.use(errorHanlder);

module.exports = app;
