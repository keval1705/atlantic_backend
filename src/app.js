const express = require("express");
const mongoose = require("mongoose");
const httpStatus = require('http-status');
const {apiError} = require("./utils/index");
const { errorConverter, errorHandler } = require('./middlewares/error');

const path = require('path');

const routes = require("./router/index")
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));


app.use('/v1', routes);

app.use((req, res, next) => {
    next(new apiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
