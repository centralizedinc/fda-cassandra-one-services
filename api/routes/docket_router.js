var router = require("express").Router();

const dao = require('../dao/DocketDao')
const response_helper = require('../utils/response_helper')

router.route('/')
    /**
     * GET ALL Dockets
     * 
     */
    .get((req, res) => {
        dao.findAll()
            .then(results => {
                response_helper.sendGetResponse(req, res, results, null, response_helper.DOC, "00");
            })
            .catch(err => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "00");
            })
    })
    /**
     * create new docket
     */
    .post((req, res) => {
        dao.createDocket(req.body)
            .then(results => {
                response_helper.sendPostResponse(req, res, results, null, response_helper.DOC, "01");
            })
            .catch(err => {
                response_helper.sendPostResponse(req, res, null, err, response_helper.DOC, "01");
            })
    })

router.route('/status/:status')
    .get((req, res) => {
        dao.findDocketByStatus(req.params.status)
            .then(results => {
                response_helper.sendGetResponse(req, res, results, null, response_helper.DOC, "10");
            })
            .catch(err => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "10");
            })
    })


router.route('/:id')
    /**
     * GET Docket by Id
     */
    .get((req, res) => {
        dao.findDocket(req.params.id)
            .then(results => {
                response_helper.sendGetResponse(req, res, results, null, response_helper.DOC, "10");
            })
            .catch(err => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "10");
            })
    })
    /**
     * UPDATE Docket
     */
    .post((req, res) => {
        dao.updateDocket(req.params.id, req.body)
            .then(results => {
                response_helper.sendPostResponse(req, res, results, null, response_helper.DOC, "11");
            })
            .catch(err => {
                response_helper.sendPostResponse(req, res, null, err, response_helper.DOC, "11");
            })
    })

router.route('/user/:username')
    .get((req, res) => {
        dao.findDocketByUsername(req.params.username)
            .then(results => {
                response_helper.sendGetResponse(req, res, results, null, response_helper.DOC, "12");
            })
            .catch(err => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "12");
            })
    })

module.exports = router;