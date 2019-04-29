"use strict";

// var axios = require('axios')
var router = require("express").Router();

// DAO
var dao = require('../dao/AccountsDao')

// Utils
var response_helper = require('../utils/response_helper')

router.route('/')
.get((req, res)=>{
    dao.findAll()
    .then(result=>{
        response_helper.sendGetResponse(req, res, result, null, response_helper.ACCOUNT, "01");
    })
    .catch(error=>{
        response_helper.sendGetResponse(req, res, null, error, response_helper.ACCOUNT, "01");
    })
})

.post((req, res)=>{
    dao.add(req.body)
    .then(result=>{
        response_helper.sendPostResponse(req, res, result, null, response_helper.ACCOUNT, "01");
    })
    .catch(error=>{
        response_helper.sendPostResponse(req, res, null, error, response_helper.ACCOUNT, "01");
    })
})

router.route('/:id')
/**
 * find specific account
 */
.get((req, res)=>{

})

/**
 * update account
 */
.post((req, res)=>{

    dao.modifyAccountById(req.params.id, req.body)
    .then(result=>{
        response_helper.sendPostResponse(req, res, result, null, response_helper.ACCOUNT, "01");
    })
    .catch(error=>{
        response_helper.sendPostResponse(req, res, null, error, response_helper.ACCOUNT, "01");
    })
})

module.exports = router;