var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    case_no:String,
    created_by:String,
    created_date: Date,
    modified_by:String,
    modified_date: Date,
})

module.exports = mongoose.model("cases", schema);