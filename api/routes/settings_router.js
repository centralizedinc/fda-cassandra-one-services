var router = require("express").Router();

// DAO
var SettingsDao = require('../dao/SettingsDao')

// Utils
var response_helper = require('../utils/response_helper')


router.route("/")
.get((req, res)=>{
    SettingsDao.getSettings((err, settings)=>{
        res.json(settings);
    })    
})

module.exports = router;
