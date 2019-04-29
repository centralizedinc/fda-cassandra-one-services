
const model = require('../models/ReferenceModel')

class ReferenceDao {

    /**
     * @description find documents by collection
     * @param {String} collection 
     * @returns {Promise}
     */
    static findReferenceCollection(collection){        
        return model.find({collection_name:collection}).exec()
    }

    static findReferences(){
       return model.find().exec()
    }

    static save(item){
        return (new model(item)).save()
    }
}



module.exports = ReferenceDao;