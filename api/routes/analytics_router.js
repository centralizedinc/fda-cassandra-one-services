var router = require("express").Router();

const dao = require('../dao/DocketDao')
const response_helper = require('../utils/response_helper')

var status = 4

router.route('/dockets')
    /**
     * GET ALL Dockets
     * 
     */
    .get((req, res) => {
        var analytics = {
            total: 0,
            data: []
        }
        dao.findDocketByStage(0)
            .then((dockets) => {
                if (dockets && dockets.length) {
                    analytics.total = dockets.length
                    for (let i = 0; i <= status; i++) {
                        var result = dockets.filter(d => d.current_status === i);
                        analytics.data.push({
                            current_status: i,
                            count: result ? result.length : 0
                        })
                    }
                }
                response_helper.sendGetResponse(req, res, analytics, null, response_helper.DOC, "01");
            }).catch((err) => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "01");
            });
    })

router.route('/cases')
    /**
     * GET ALL CASES
     */
    .get((req, res) => {
        var analytics = {
            total: 0,
            data: []
        }
        dao.findDocketByStage(1)
            .then((cases) => {
                if (cases && cases.length) {
                    analytics.total = cases.length
                    for (let i = 0; i <= status; i++) {
                        var result = cases.filter(d => d.current_status === i);
                        analytics.data.push({
                            current_status: i,
                            count: result ? result.length : 0
                        })
                    }
                }
                response_helper.sendGetResponse(req, res, analytics, null, response_helper.DOC, "02");
            }).catch((err) => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "02");
            });
    })

router.route('/appeals')
    /**
     * GET ALL CASES
     */
    .get((req, res) => {
        var analytics = {
            total: 0,
            data: []
        }
        dao.findDocketByStage(2)
            .then((appeals) => {
                if (appeals && appeals.length) {
                    analytics.total = appeals.length
                    for (let i = 0; i <= status; i++) {
                        var result = appeals.filter(d => d.current_status === i);
                        analytics.data.push({
                            current_status: i,
                            count: result ? result.length : 0
                        })
                    }
                }
                response_helper.sendGetResponse(req, res, analytics, null, response_helper.DOC, "03");
            }).catch((err) => {
                response_helper.sendGetResponse(req, res, null, err, response_helper.DOC, "03");
            });
    })

module.exports = router;