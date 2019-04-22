var router = require("express").Router();

router.route('/')
/**
 * GET ALL Reference tables
 */
.get((req, res)=>{

})

router.route('/:table_name')
/**
 * GET reference data by table
 */
.get((req, res)=>{

})
/**
 * CREATE/UPDATE reference data by table
 */
.post((req, res)=>{

})

router.route('/:table_name/:id')
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