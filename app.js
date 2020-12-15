const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// VARIABLES DE ENTORNO
require('dotenv').config();
// IMPORT RUTAS
const postsRouter = require('./routes/posts');

// DATABASE
const db = require('./db');
// APP
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// RUTAS
app.use('/api/posts', postsRouter);

module.exports = app;
