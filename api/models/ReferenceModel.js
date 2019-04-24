var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    code: String,
    description:String,
    collection_name:String,
    parent:String,
    status:String,
    created_by:String,
    created_date: Date,
    modified_by: String,
    modified_date: Date
})

module.exports = mongoose.model("references", schema);