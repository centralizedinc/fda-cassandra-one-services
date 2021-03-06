const model = require('../models/DocketModel')


class DocketDao {
    /**
     * @returns {Promise}
     * @param {DocketModel} docket_details 
     */
    static createDocket(docket_details) {
        return (new model(docket_details)).save()
    }

    /**     
     * @returns {Promise}
     */
    static findAll() {
        return model.find({}).exec()
    }

    /**
     * @param {String} id 
     * @returns {Promise}
     */
    static findDocket(id) {
        return model.findById(id).exec()
    }

    static findDocketByStatus(status) {
        return model.find({
            current_status: status
        }).exec()
    }

    static findDocketByUsername(username) {
        return model.find({
            'user.username': username
        }).exec()
    }

    /**
     * 
     * @param {Number} stage 
     */
    static findDocketByStage(stage) {
        return model.find({
            stage: stage
        }).exec()
    }

    /**     
     * @returns {Promise}
     */
    static findAllActivities() {
        return model.find({}).select('dtn activities').exec()
    }

    /**
     * @param {String} id 
     * @param {DocketModel} docket_details 
     * @returns {Promise}
     */
    static updateDocket(id, docket_details) {
        return model.findByIdAndUpdate(id, docket_details, {
            new: true
        }).exec()
    }
}


module.exports = DocketDao;