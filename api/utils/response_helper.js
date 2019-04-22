"use strict";

// var AuditDao = require('../dao/AuditDao')
var jwt = require("jsonwebtoken")

const GET = "00";
const POST = "01";
var routers = {
    AUTH: {
        code: 'ATH',
        name: 'Authentication'
    },
    ACCOUNT: {
        code: 'ACC',
        name: 'Account'
    },
    CASE: {
        code: 'CAS',
        name: 'Case'
    },
    DOC: {
        code: 'DOC',
        name: 'Docket'
    },
    ADMIN: {
        code: 'ADM',
        name: 'Admin'
    },
    UPLOAD: {
        code: 'UPL',
        name: 'Upload'
    },
    SESSION: {
        code: 'SSN',
        name: 'Session'
    }
}

// Response on save
function sendResponse(req, res, model, err, route_code, name) {
    console.log(
        "################## Route Response ##################" +
        "\nNAME: " + name +
        "\nROUTER CODE: " + route_code +
        "\nERRORS: " + err +
        "\nMODEL: " + JSON.stringify(model) +
        "\n##################****************##################")

    // if (typeof model === 'string') {
    //     model = JSON.parse(model)
    // }
    // if (typeof err === 'string') {
    //     err = JSON.parse(err)
    // }
    var user_id = ""
    if (req.headers && req.headers.access_token)
        var access_token = jwt.decode(req.headers.access_token);
    if (access_token) {
        user_id = access_token.id
    }

    // var log = {
    //     url: req.originalUrl,
    //     method: req.route.methods.get ? "GET" : req.route.methods.post ? "POST" : "",
    //     request_details: {
    //         headers: req.headers,
    //         query: req.query,
    //         params: req.params,
    //         body: req.body
    //     },
    //     response_details: {
    //         name: name,
    //         code: route_code,
    //         errors: err,
    //         model: model
    //     },
    //     user: user_id
    // }

    // AuditDao.log(log, (er, logs) => {
    //     if (err) { // Errors
    //         if (err.code === 11000) { // Unique Fields
    //             res.status(200).json({
    //                 success: false,
    //                 code: route_code,
    //                 errors: [{
    //                     field: name,
    //                     message: name + " already exist !"
    //                 }]
    //             })
    //         } else if (err.errors) { // Required Fields 
    //             var error_fields = Object.keys(err.errors);
    //             var errors = [];
    //             error_fields.forEach(field => {
    //                 errors.push({
    //                     message: err.errors[field].message,
    //                     field: field
    //                 })
    //             });
    //             res.status(200).json({
    //                 success: false,
    //                 code: route_code,
    //                 errors: errors
    //             })
    //         } else if (err.local_errors) { // Computed Fields
    //             res.status(200).json({
    //                 success: false,
    //                 code: route_code,
    //                 errors: err.local_errors
    //             });
    //         } else { // Internal Server Error
    //             res.status(500).json(err)
    //         }
    //     } else { // Success 
    //         res.status(200).json({
    //             success: true,
    //             code: route_code,
    //             model: model
    //         });
    //     }
    // })
}

function sendGetResponse(req, res, model, err, route_code, index) {
    if (index < 10) {
        index = "0" + parseInt(index).toString();
    }
    sendResponse(req, res, model, err, route_code.code + index.toString() + GET, route_code.name);
}

function sendPostResponse(req, res, model, err, route_code, index) {
    if (index < 10) {
        index = "0" + parseInt(index).toString();
    }
    sendResponse(req, res, model, err, route_code.code + index.toString() + POST, route_code.name);
}

function sendExpirationResponse(res, code, token, err) {
    console.log(
        "################## Route Response ##################" +
        "\nCODE: " + code +
        "\nTOKEN: " + token +
        "\nERROR: " + JSON.stringify(err) +
        "\n##################****************##################")
    if (typeof err === 'string') {
        err = JSON.parse(err)
    }

    if (code === 'MULTIPLE_SESSION') {
        res.status(401).json({
            success: false,
            code: code,
            icons: "add_alert",
            errors: [{
                field: "",
                message: "Multiple Session is not allowed",
                icons: "add_alert"
            }]
        })
    } else {
        res.status(401).json({
            success: false,
            code: code,
            errors: [{
                field: "",
                message: "Invalid Token/Session is already expired. Please re-login"
            }]
        })
    }
}

var response_helper = Object.assign({
        sendGetResponse,
        sendPostResponse,
        sendExpirationResponse
    },
    routers);

module.exports = response_helper;