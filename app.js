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
app.use("/cases", require('./api/routes/case_router'));
app.use("/dockets", require('./api/routes/docket_router'));
app.use("/references", require('./api/routes/reference_router'));
app.use("/settings", require('./api/routes/settings_router'));
app.use("/upload", require('./api/routes/upload_router'));

module.exports = app;