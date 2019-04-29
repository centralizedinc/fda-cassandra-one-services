'use strict'

//DB connection
// =============================================================================
var mongoose = require('mongoose');
var constants_helper = require('./constants_helper');
mongoose.Promise = require('bluebird');

var SettingsDao = require('../dao/SettingsDao')
var ApplicationSettings = require('./ApplicationSettings')

const uploader = require('./uploader')

function connect() {
    mongoose.connect(constants_helper.mongodb_uri, {
            useCreateIndex: true,
            useNewUrlParser: true ,
            promiseLibrary: require('bluebird')
        })
        .then(() => {
            console.log('connection succesful')
            SettingsDao.getSettings((err, params)=>{
                ApplicationSettings.setApplicationVariables(params)
                console.log('Initialized Application Settings: ' + JSON.stringify(ApplicationSettings.getApplicationVariables()));
                uploader.setKeys()
            })
        })
        .catch((err) => console.error(err));
}

module.exports = {
    connect: connect,
    db: mongoose
};