
/**
 * Created by muyonghui on 16/5/29.
 */

var express = require('express');
var router = express.Router();

var RestResult = require('../common/RestResult');
var UserAccountEntity = require('../models/UserAccount').UserAccountEntity;
var UserAddressEntity = require('../models/UserAddress').UserAddressEntity;
var BusinessEntity    = require('../models/Business').BusinessEntity;
var CommodityEntity   = require('../models/Commodity').CommodityEntity;

router.post('/businessList', function (req, res, next) {
    BusinessEntity.find({}, function (err, business) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }
        res.success(business);
    })
});

router.post('/commodityList', function (req, res, next) {
    var business = req.body.business;

    CommodityEntity.find({businessid:business}, function (err, docs) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }
        res.success(docs);
    })
})

module.exports = router;