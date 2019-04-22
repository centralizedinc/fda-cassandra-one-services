"use strict";

var jwt = require("jsonwebtoken");
var AccessKeys = require("./key");
var response_helper = require('./response_helper');
var AccountsModel = require("../models/AccountsModel");


function verifySession(req, res, next) {
    if (req.method === "OPTIONS") {
        // console.log('!OPTIONS');
    } else {
        var token = req.headers.access_token;
        if (token) {
            jwt.verify(token, AccessKeys.key, (err, decoded) => {
                if (err) {
                    response_helper.sendExpirationResponse(res, "SESSION_EXPIRED", token, err);
                } else {
                    AccountsModel.findById(decoded.id, (err, user) => {
                        if (user &&
                            user.session_token &&
                            user.session_token !== "") {
                            if (user.session_token === token) {
                                next();
                            } else {
                                response_helper.sendExpirationResponse(res, "MULTIPLE_SESSION", token, err);
                            }
                        } else {
                            response_helper.sendExpirationResponse(res, "INVALID_TOKEN", token, err);
                        }
                    })
                }
            });
        } else {
            response_helper.sendExpirationResponse(res, "MISSING_TOKEN", token, null);
        }
    }
}

module.exports = verifySession