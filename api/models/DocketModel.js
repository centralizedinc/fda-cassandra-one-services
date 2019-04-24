var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    docket_no:String,
    docket_tracking_no:String,
    created_by:String,
    created_date: Date,
    modified_by:String,
    modified_date: Date,
    
    //new docket

    dtn : 0,
    origin_cluster: String,
    origin_region: String,
    origin_area: String,
    inspection_date: Date,
    inspection_inspector: String,
    inspection_purpose: String,
    rov_date: Date,
    rov_date_receive: Date,
    rov_center_involved: String,
    establishment_compliant: String,
    establishment_name: String,
    establishment_owner: String,
    establishment_classification: String,
    pharmacist_radiologist: String,
    class_of_product: String,
    establishment_address_region: String,
    establishment_address_province: String,
    establishment_address_city: String,
    establishment_address: String,
    documents: File,

    // next page

    date_decked: Date,
    IS_evaluator: String,
    date_evaluated: Date,
    date_forwarded_to_SL: Date,
    action_taken_by_SL: String,
    docket_number: 0,
    date_docketed: Date,
    date_issued: Date,
    products_involved: String,
    laws_violated: String,
    lto: String,
    lto_number: String,
    lto_validity: Date,
    center_involved: String,
    violation_product: String,
    violation_qualified_personnel: String,
    violation_others: String
})

module.exports = mongoose.model("dockets", schema);