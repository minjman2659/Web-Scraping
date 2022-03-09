const express = require('express');
const cookieParser = require('cookie-parser');

const { missingPath, errorHandler } = require('middleware');
const routes = require('./routes');

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '30mb' }));

app.use('/', routes);
app.use(missingPath);
app.use(errorHandler);

module.exports = app;
