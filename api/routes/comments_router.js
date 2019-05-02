var router = require("express").Router();

const CommentsDao = require('../dao/CommentsDao')

const response_helper = require('../utils/response_helper')

var status = 4

router.route('/')
    /**
     * GET ALL Comments
     * 
     */
    .get((req, res) => {
        CommentsDao.findAll()
            .then((comments) => {
                response_helper.sendGetResponse(req, res, comments, null, response_helper.COMMENTS, "01");
            }).catch((err) => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.COMMENTS, "01");
            });
    })
    /**
     * ADD NEW COMMENTS
     * 
     */
    .post((req, res) => {
        CommentsDao.addNewComment(req.body)
            .then((comments) => {
                response_helper.sendGetResponse(req, res, comments, null, response_helper.COMMENTS, "01");
            }).catch((err) => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.COMMENTS, "01");
            });
    })

router.route('/docket/:dtn')
    /**
     * GET ALL Comments
     * 
     */
    .get((req, res) => {
        CommentsDao.findCommentsByDtn(req.params.dtn)
            .then((comments) => {
                response_helper.sendGetResponse(req, res, comments, null, response_helper.COMMENTS, "01");
            }).catch((err) => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.COMMENTS, "01");
            });
    })

module.exports = router;