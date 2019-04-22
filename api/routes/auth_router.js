"use strict";

// var axios = require('axios')
var router = require("express").Router();

// DAO
var AccountsDao = require('../dao/AccountsDao')
// var AdminAccountsDao = require('../dao/AdminAccountsDao')

// Utils
var response_helper = require('../utils/response_helper')
var ApplicationSettings = require('../utils/ApplicationSettings')

router.route('/')
    .post((req, res) => {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({
                message: 'Missing Authorization Header'
            })
        }

        const base64Credentials = req.headers.authorization.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
        const [username, password] = credentials.split(':')

        AccountsDao.getAccountByConditions({
            username: username
        }, (err, user) => {
            if (user) {
                user.auth(password, (err, result) => {
                    result.isConfirmed = user.status > 0;
                    if (err) {
                        response_helper.sendPostResponse(req, res, null, err, response_helper.AUTH, 0)
                    } else if (result.user) {
                        result.user.password = undefined;
                        response_helper.sendPostResponse(req, res, result, err, response_helper.AUTH, 0)
                    } else {
                        response_helper.sendPostResponse(req, res, result, null, response_helper.AUTH, 0)
                    }
                });
            } else {
                var resp = {
                    isMatch: false
                }
                response_helper.sendPostResponse(req, res, resp, err, response_helper.AUTH, 0)
            }
        });
    })

router.route('/active')
    .get((req, res) => {
        AccountsDao.checkAccountStatus(req.query.username, (err, result) => {
            response_helper.sendGetResponse(req, res, result, err, response_helper.AUTH, 1)
        })
    })

// router.route('/admin')
//     .post((req, res) => {
//         var username = req.body.username;
//         var password = req.body.password;
//         AdminAccountsDao.getAdminAccountByConditions({
//             username: username
//         }, (err, user) => {
//             console.log('user :', JSON.stringify(user));
//             if (user) {
//                 user.auth(password, (err, result) => {
//                     if (err) {
//                         response_helper.sendPostResponse(req, res, null, err, response_helper.AUTH, 0)
//                     } else if (result.user) {
//                         result.user.password = undefined;
//                         response_helper.sendPostResponse(req, res, result, null, response_helper.AUTH, 0)
//                     } else {
//                         response_helper.sendPostResponse(req, res, result, null, response_helper.AUTH, 0)
//                     }
//                 });
//             } else {
//                 var resp = {
//                     isMatch: false
//                 }
//                 response_helper.sendPostResponse(req, res, resp, err, response_helper.AUTH, 0)
//             }
//         });
//     })

/**
 *
 * @description authentication route for Approver, Admin and Encoder Portals
 */
// router.route('/admins')
//     .post((req, res) => {
//         console.log("HEADERS: " + req.headers.authorization )
//         if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
//             return res.status(401).json({
//                 message: 'Missing Authorization Header'
//             })
//         }

//         const base64Credentials = req.headers.authorization.split(' ')[1]
//         const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
//         const [username, password] = credentials.split(':')
//         console.log("############CHECK1 " + username + ":" + password + ":"+req.body.role)
//         AdminAccountsDao.getAdminAccountByConditions({
//             username: username,
//             role: req.body.role
//         }, (err, user) => {
//             console.log("############CHECK2 " + user)
//             if (user) {
//                 console.log("############CHECK3 ")
//                 user.auth(password, (err, result) => {
//                     console.log("############CHECK4 ")
//                     if (err) {
//                         console.log("############ERROR1 " + err)
//                         response_helper.sendPostResponse(req, res, null, err, response_helper.AUTH, 0)
//                     } else if (result.user) {
//                         result.user.password = undefined;
//                         result.isConfirmed = user.status > 0;
//                         response_helper.sendPostResponse(req, res, result, err, response_helper.AUTH, 0)
//                     } else {
//                         console.log("############ERROR1 ")
//                         response_helper.sendPostResponse(req, res, result, null, response_helper.AUTH, 0)
//                     }
//                 });
//             } else {
//                 console.log("############CHECK5 ")
//                 var resp = {
//                     isMatch: false
//                 }
//                 response_helper.sendPostResponse(req, res, resp, err, response_helper.AUTH, 0)
//             }
//         });
//     })

router.route('/recovery')
    .post((req, res) => {
        var email = req.body.email;
        AccountsDao.getAccountByConditions({
            email
        }, (err, account) => {
            if (!err) {
                var expiry = (new Date()).getTime() + 86400000; //24 hrs expired
                var confirmation_key = (new Buffer(account.username + ":" + account.email + ":" + expiry).toString('base64'))
                // axios.post(ApplicationSettings.getValue("RECOVERY_NOTIFICATION_URL"), {
                //         email: account.email,
                //         name: account.name.first,
                //         confirmation_url: ApplicationSettings.getValue("RECOVERY_URL") + confirmation_key
                //     })
                //     .then((notification_res) => {
                //         response_helper.sendPostResponse(req, res, account, err, response_helper.ACCOUNT, 0);
                //     }).catch(notification_err => {
                //         response_helper.sendPostResponse(req, res, account, notification_err, response_helper.ACCOUNT, 0);
                //     })
            } else {
                response_helper.sendPostResponse(req, res, account, err, response_helper.ACCOUNT, 0);
            }
        })
    })

router.route('/recovery/confirmation')
    .get((req, res) => {
        if (!req.query.key) {
            response_helper.sendGetResponse(req, res, null, {
                errors: [{
                    message: "No key found",
                    field: "key"
                }]
            }, response_helper.ACCOUNT, 11);
        } else {
            const decoded = new Buffer(req.query.key, "base64").toString();
            const [username, email, expiry] = decoded.split(":");
            if (expiry < new Date().getTime()) {
                response_helper.sendGetResponse(req, res, null, {
                    errors: [{
                        message: "Expired confirmation key",
                        field: "key"
                    }]
                }, response_helper.ACCOUNT, 11);
            } else {
                AccountsDao.findAccountId(username, email, (err, account) => {
                    response_helper.sendGetResponse(req, res, account, err, response_helper.ACCOUNT, 11);
                })
            }
        }
    })

/**
 * @description forgot password
 */
router.route('/recovery/password')
    .post((req, res) => {
        var account = req.body
        console.log('ACCOUNTS: ' + JSON.stringify(account))
        AccountsDao.updatePassword(account._id, account, (err, update) => {
            response_helper.sendPostResponse(req, res, update, err, response_helper.ACCOUNT, 12)
        })
    })

module.exports = router;