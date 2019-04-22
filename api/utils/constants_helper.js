"use strict";

var mongodb_uri = 'mongodb://heroku_hvcpp3k7:ro5qpefdsf05nbv4qlb14si43r@ds123532.mlab.com:23532/heroku_hvcpp3k7'

module.exports = {
    mongodb_uri: process.env.MONGODB_URI || mongodb_uri,
    home_url: "https://fda-services.herokuapp.com/"
}