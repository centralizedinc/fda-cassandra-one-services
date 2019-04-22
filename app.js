"use strict";

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())
app.options('*', cors())


// DB Connection
//#############################################################################
require("./api/utils/db_helper").connect();

//Routes
//#############################################################################

app.use("/auth", require('./api/routes/auth_router'));
app.use("/settings", require('./api/routes/settings_router'));

module.exports = app;