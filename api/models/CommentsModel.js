var mongoose = require("mongoose");

var CommentsModelSchema = new mongoose.Schema({
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    },
    user: {
        type: Object
    },
    dtn: {
        type: String
    },
    details: {
        type: Object
    }
})

module.exports = mongoose.model("comments", CommentsModelSchema);