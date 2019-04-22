var router = require('express').Router();

const dao = require('../dao/CaseDao')
const response_helper = require('../utils/response_helper')

router.route('/')
/**
 * GET ALL Cases
 * This should be remove pre-prod
 */
.get((req, res)=>{
    dao.findAll()
    .then(results=>{
        response_helper.sendGetResponse(req, res, results, null, response_helper.CASE, "00");
    })
    .catch(err=>{
        response_helper.sendGetResponse(req, res, null, err, response_helper.CASE, "00");
    })
})
/**
 * create new case
 */
.post((req, res)=>{
    dao.createCase(req.body)
    .then(results=>{
        response_helper.sendPostResponse(req, res, results, null, response_helper.CASE, "01");
    })
    .catch(err=>{
        response_helper.sendPostResponse(req, res, null, err, response_helper.CASE, "01");
    })
})

router.route('/:id')
/**
 * GET Case by Id
 */
.get((req, res)=>{
    dao.findCase(req.params.id)
    .then(results=>{
        response_helper.sendGetResponse(req, res, results, null, response_helper.CASE, "10");
    })
    .catch(err=>{
        response_helper.sendGetResponse(req, res, null, err, response_helper.CASE, "10");
    })
})
/**
 * UPDATE Case
 */
.post((req, res)=>{
    dao.updateCase(req.params.id, req.body)
    .then(results=>{
        response_helper.sendPostResponse(req, res, results, null, response_helper.CASE, "11");
    })
    .catch(err=>{
        response_helper.sendPostResponse(req, res, null, err, response_helper.CASE, "11");
    })
})

module.exports = router;