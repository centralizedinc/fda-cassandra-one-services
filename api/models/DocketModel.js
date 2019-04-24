var mongoose = require("mongoose");

var DocketModelSchema = new mongoose.Schema({
    // docket_no: String,
    // docket_tracking_no: String,
    // created_by: String,
    // created_date: Date,
    // modified_by: String,
    // modified_date: Date,

   
        user: String,
        date_created: Date,

        //new docket

        dtn: 0,
        origin_cluster: String,
        origin_region: String,
        origin_area: String,
        inspection_date: Date,
        inspection_inspector: String,
        inspection_purpose: String,
        rov_date: Date,
        rov_date_receive: Date,
        rov_center_involved: String,
        complainant_name: String,
        complaint_cause: String,
        establishment_compliant: String,
        establishment_name: String,
        establishment_owner: String,
        establishment_classification: String,
        establishment_pharmacist: String,
        product_classification: String,
        establishment_region: String,
        establishment_province: String,
        establishment_city: String,
        establishment_address: String,
        documents: {},
        complaint_name:String,
        complaint_cause:String,
        date_decked: Date,
        IS_evaluator: String,
        date_evaluated: Date,
        date_forwarded_to_SL: Date,
        action_taken_by_SL: String,
        docket_number: 0,
        date_docketed: Date,
        date_issued: Date,
        product_involved: String,
        laws_violated: String,
        lto: String,
        license_no: String,
        license_validity: Date,
        center_involved: String,
        violation_product: String,
        violation_qualified_personnel: String,
        violation_others: String,

        current_status: Number,
        // task
        // evaluation = 0
        // review = 1
        // approval = 2  
  

    activities:[{
        task: Number,
        user: String,
        date_created: Date,
        date_forwarded: Date,
        modified_by: String,
        date_modified: Date,

        //Evaluation

        decking: String,
        IS_evaluator: String,
        // date_evaluated: Date,
        action_taken: String,
        if_legal_order: String,
        reason_for_remanding: String,

        // Review

        // date_forwarded_to_SL: Date,
        action_taken_by_SL: String,
        comment: String,
        // date_return_to_evaluator: Date,
        // date_of_submission_of_edited_draft_to_SL: Date,
        // action_taken: String,
        // date_approved_by_SL: Date,
        // date_submitted_OIC_LSSC_review: Date,
        action_taken_OIC_LSSC: String,
        // comments: String,
        // date_forward_to_evaluator: Date,
        final_action: String,
        reason_for_remanding: String,
        // date_released_for_mailing: Date,
        // date_finalized: Date,
        // date_forwarded_for_signature_SL: Date,
        // date_submitted_for_signature_OIC_LSSC: Date,

        // Approval

        // date_submitted_to_docketing_officer: Date,
        // date_docketed: Date,
        case_number: 0,
        // date_forwarded_to_IS_for_finalization: Date,
        // date_of_IS_finalized: Date,

        decision: Boolean
    }],
})

module.exports = mongoose.model("dockets", DocketModelSchema);