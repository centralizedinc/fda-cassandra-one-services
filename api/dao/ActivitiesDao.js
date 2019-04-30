const model = require('../models/ActivitiesModel')


class ActivitiesDao {
    /**
     * @returns {Promise}
     * @param {ActivitiesModel} details 
     */
    static createActivities(details) {
        return (new model(details)).save()
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
    static findActivity(id) {
        return model.findById(id).exec()
    }

    /**
     * @param {String} status
     * @returns {Promise}
     */
    static findActivityByStatus(status) {
        return model.find({
            status
        }).exec()
    }


}


module.exports = ActivitiesDao;