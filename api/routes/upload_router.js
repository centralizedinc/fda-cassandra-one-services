var router = require('express').Router();
const response_helper = require('../utils/response_helper')
var Uploader = require('../utils/uploader')

router.route('/')
    /**
     * nothing to show here
     */
    .get((req, res) => {
        res.sendStatus(200)
    })
    /**
     * upload file
     */
    .post((req, res) => {
        const upload = Uploader.uploadDocuments(req.query.account_id);
        upload(req, res, function (err, some) {
            console.log('RESULTS: ' + JSON.stringify(req.files))
            if (err) {
                response_helper.sendPostResponse(req, res, req.files, err, response_helper.UPLOAD, 1)
            } else {
                response_helper.sendPostResponse(req, res, req.files, err, response_helper.UPLOAD, 1)
            }

        })
    })

    .delete((req, res) => {
        Uploader.deleteDocuments(req.body.keys)
            .then(result => {
                response_helper.sendPostResponse(req, res, result, err, response_helper.DOCUMENT, 1)
            })
            .catch(err => {
                response_helper.sendPostResponse(req, res, null, err, response_helper.DOCUMENT, 1)
            })
    })

router.route('/avatars')
    .post((req, res) => {
        const singleUpload = Uploader.uploadAvatar(req.query.account_id);
        singleUpload(req, res, function (err, some) {
            if (err) {
                response_helper.sendPostResponse(req, res, null, err, response_helper.UPLOAD, 1)
            } else {
                console.log(req.file)
                response_helper.sendPostResponse(req, res, req.file, err, response_helper.UPLOAD, 1)
            }
        })
    })
    .delete((req, res) => {
        key = req.body.key;
        Uploader.deleteAvatar(key)
            .then(result => {
                response_helper.sendPostResponse(req, res, result, err, response_helper.UPLOAD, 1)
            })
            .catch(err => {
                response_helper.sendPostResponse(req, res, null, err, response_helper.UPLOAD, 1)
            })
    })

module.exports = router;