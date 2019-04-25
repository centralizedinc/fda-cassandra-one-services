
const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    collection_seq: String,
    count: Number
})


schema.statics.getSequence = function(collection_name){
    return this.findOneAndUpdate(
            {collection_seq:collection_name},
            {$inc:{count:1}},
            {new:true, fields:{"count":1, "_id":0}}
        ).exec()
}

module.exports = mongoose.model("counters", schema);