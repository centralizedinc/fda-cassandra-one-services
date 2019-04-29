
const model = require('../models/RolesModel')

class ReferenceDao {

   static findAll(){
       return model.find().exec()
   }

   static find(id){
       return model.findOne({code: id}).exec()
   }

   static save(role){
       return (new model(role)).save()
   }

   static update(role){
       return model.findByIdAndUpdate(role._id, role, {new:true}).exec()
   }
}



module.exports = ReferenceDao;