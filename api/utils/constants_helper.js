"use strict";

var mongodb_uri = 'mongodb://heroku_hc28s3rg:hafrpu7cd71b8rs822co63vcri@ds145786.mlab.com:45786/heroku_hc28s3rg'

module.exports = {
    mongodb_uri: process.env.MONGODB_URI || mongodb_uri
}