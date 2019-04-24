var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    case_no:String,
    created_by:String,
    created_date: Date,
    modified_by:String,
    modified_date: Date,

    // CASE MODEL
    case:[{
        date_forwarded_to_LSSC_releasing_for_DGDDG_signature: Date,
        date_submitted_to_DGDDG_for_signature: Date,
        date_returned_to_LSSC: Date,
        date_order_issued: Date,
        order_issued_act: String,
        order_issued_violated_law: String,
        directive_to_REU: String,
        date_released_receive_by_REU: Date,
        date_serve_or_executed: Date,
        date_PER_receive: Date,
        execution_details_if_served: String,
        execution_details_if_not_served: String   
    }]
})

module.exports = mongoose.model("cases", schema);