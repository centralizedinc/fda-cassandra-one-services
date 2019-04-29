var router = require("express").Router();

const dao  = require('../dao/ReferenceDao')
const response_helper = require('../utils/response_helper')

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

  const groupByCollection = groupBy('collection_name');

router.route('/')
/**
 * GET ALL Reference tables
 */
.get((req, res)=>{
    dao.findReferences()
    .then(results=>{
        response_helper.sendGetResponse(req, res, groupByCollection(results), null, response_helper.REF, "11");
    })
    .catch(error =>{
        response_helper.sendGetResponse(req, res, null, error, response_helper.REF, "11");
    })
})

router.route('/all')
.get((req, res)=>{
    dao.findReferences()
    .then(results=>{
        response_helper.sendGetResponse(req, res, results, null, response_helper.REF, "11");
    })
    .catch(error =>{
        response_helper.sendGetResponse(req, res, null, error, response_helper.REF, "11");
    })
})

router.route('/:collection_name')
/**
 * GET reference data by table
 */
.get((req, res)=>{
    dao.findReferenceCollection(req.params.collection_name)
    .then(results=>{
        response_helper.sendGetResponse(req, res, results, null, response_helper.REF, "21");
    })
    .catch(error =>{
        response_helper.sendGetResponse(req, res, null, error, response_helper.REF, "21");
    })
})
/**
 * CREATE/UPDATE reference data by table
 */
.post((req, res)=>{

})

router.route('/:collection_name/:id')
/**
 * GET reference data by table and id
 */
.get((req, res)=>{

})
/**
 * CREATE/UPDATE reference data by table and id
 */
.post((req, res)=>{

})

module.exports = router;