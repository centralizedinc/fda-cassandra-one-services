const model = require('../models/CaseModel')


class CaseDao{

    /**
     * 
     * @param {CaseModel} case_details 
     * @returns {Promise}
     */
    static createCase(case_details){
       return (new model(case_details)).save()
    }

    /**
     * 
     * @param {*} case_id 
     * @returns {Promise}
     */
    static findCase(case_id){
        return model.findById(case_id).exec()
    }

    /**
     * 
     * 
     * @returns {Promise}
     */
    static findAll(){
        return model.find({}).exec()
    }

    /**
     * 
     * @param {*} case_id 
     * @returns {Promise}
     */
    static updateCase(case_id, case_details){
        return model.findByIdAndUpdate(case_id, case_details).exec()
    }
    

}


module.exports = CaseDao;