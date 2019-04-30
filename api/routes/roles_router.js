var router = require("express").Router();

const dao  = require('../dao/RolesDao')
const response_helper = require('../utils/response_helper')

router.route('/')

/**
 * @description find all
 */
.get((req, res)=>{
    dao.findAll()
    .then(results=>{
        response_helper.sendGetResponse(req, res, results, null, response_helper.ROLE, "10");
    })
    .catch(error =>{
        response_helper.sendGetResponse(req, res, null, error, response_helper.ROLE, "10");
    })
})

/**
 * @description creates new role
 */
.post((req, res)=>{
    dao.save(req.body)
    .then(results=>{
        response_helper.sendPostResponse(req, res, results, null, response_helper.ROLE, "11");
    })
    .catch(error =>{
        response_helper.sendPostResponse(req, res, null, error, response_helper.ROLE, "11");
    })
})


router.route('/:name')
.get((req, res)=>{
    dao.find(req.params.name)
    .then(results=>{
        response_helper.sendGetResponse(req, res, results, null, response_helper.ROLE, "10");
    })
    .catch(error =>{
        response_helper.sendGetResponse(req, res, null, error, response_helper.ROLE, "10");
    })
})

.post((req, res)=>{
    dao.update(req.body)
    .then(results=>{
        response_helper.sendPostResponse(req, res, results, null, response_helper.ROLE, "10");
    })
    .catch(error =>{
        response_helper.sendPostResponse(req, res, null, error, response_helper.ROLE, "10");
    })
})



module.exports = router;
