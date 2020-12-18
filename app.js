const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const logError = require('./middlewares/logError');
const errorHanlder = require('./middlewares/errorHandler');

require('dotenv').config();

const postsRouter = require('./routes/posts');

const db = require('./db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', postsRouter);
app.use(logError);
app.use(errorHanlder);

module.exports = app;
