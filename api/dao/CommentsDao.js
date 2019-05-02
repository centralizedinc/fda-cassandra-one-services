const model = require('../models/CommentsModel')


class CommentsDao{

    /**
     * 
     * @param {CommentsModel} details 
     * @returns {Promise}
     */
    static addNewComment(details){
       return (new model(details)).save()
    }

    /**
     * 
     * @param {*} id 
     * @returns {Promise}
     */
    static findComment(id){
        return model.findById(id).exec()
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
     * @param {String} dtn 
     * @returns {Promise}
     */
    static findCommentsByDtn(dtn){
        return model.find({dtn}).exec()
    }   

}


module.exports = CommentsDao;