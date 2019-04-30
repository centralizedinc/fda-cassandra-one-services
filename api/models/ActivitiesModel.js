var mongoose = require("mongoose");

var ActivitiesSchema = new mongoose.Schema({
    dtn: {
        type: String
    },
    case_number: {
        type: String
    },
    stage: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    user: {
        type: Object
    },
    date_created: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("activities", ActivitiesSchema);