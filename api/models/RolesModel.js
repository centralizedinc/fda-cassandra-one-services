var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    code:String,
    name:String,
    description:String,
    created_by:String,
    created_date:{
        type:Date,
        default:new Date()
    },
    modified_by:String,
    modified_date:{
        type:Date,
        default:new Date()
    },
    status:{
        type:String,
        default:'A'
    },
    permissions:[]
})

module.exports = mongoose.model("roles", schema);