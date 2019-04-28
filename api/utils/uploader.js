const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: "fOkAUii52rmAOOOMLNVhHxQ5zICZymEXnwZEEDwo",
  accessKeyId: "AKIAIUWBMJMJG5D2IYVQ",
  region: "ap-southeast-1" // region of your bucket
});

const s3 = new aws.S3();

class Uploader {
  static uploadAvatar(account_id) {
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: "fda-cms",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition:'inline',
        metadata: function(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
          cb(null, "avatar/" + account_id + "/" + Date.now().toString());
        }
      })
    });
    return upload.single('avatar');
  }


  /**
   * 
   * @param {avatar_key} key 
   */
  static deleteAvatar(key){
    return new Promise((resolve, reject)=>{
        var params = { Bucket: 'fda-cms', Key: key };
        s3.deleteObject(params, (err, data)=>{
            if(err){
              console.error(err);
              reject(err)              
            }else{
              resolve(data)
            }
        })
    })    
  }


  static uploadDocuments(case_no) {
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: "fda-cms",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition:'inline',
        metadata: function(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
          cb(null, "upload/" + case_no + "/" + Date.now().toString());
        }
      })
    });
    return upload.array('file');
  }

  /**
   * 
   * @param {avatar_key} key 
   */
  static deleteDocuments(keys){
    return new Promise((resolve, reject)=>{
        var params = { 
            Bucket: 'fda-cms', 
            Delete: {
                Objects: [], 
                Quiet: false
               }
        };
        keys.forEach(element => {
            params.Delete.Ojects.push({Key: element.key})
        });
        s3.deleteObjects(params, (err, data)=>{
            if(err){
              console.error(err);
              reject(err)              
            }else{
              resolve(data)
            }
        })
    })    
  }
}

module.exports = Uploader;