/**
 * Created by muyonghui on 16/5/29.
 */

var express = require('express');
var async   = require('async');

var router = express.Router();

var RestResult = require('../common/RestResult');
var OrderEntity = require('../models/Order').OrderEntity;

router.post('/showOrder', function (req, res, next) {
    var user = req.body.user;

    OrderEntity.find({uid:user._id}, function (err, orders) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }
        res.success(orders);
    })
});

router.post('/addOrder', function (req, res, next) {
    var user = req.body.user;
    var business = req.body.business;
    var commodity = req.body.commodity;
    var userAddress = req.body.useraddress;
    var totalmoney = req.body.totalmoney;
    var commodityArray = [];
    async.each(commodity, function (item, commodityArrayAsyncCallBack) {
        commodityArray.push({
            commodityid: item._id,//商品id
            commodityname: item.commodityname,//商品名
            commodityprice: item.commodityprice,//单价
            commoditynum: item.commoditynum//数量
        });
        commodityArrayAsyncCallBack();
    }, function (err) {
        if (err){
            console.log("绑定数据时，存储规则信息出错：" + err);
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "绑定数据时，存储规则信息出错：" + err);

        }
        var newOrder = new OrderEntity({
            bussinessid: business._id,//商家id
            uid: user._id,//用户useraccountid
            useraddressid : userAddress._id,
            bussinessname: business.businessname,
            totalmoney: totalmoney,
            delivermoney: business.delivermoney,//配送费
            lunchboxmoney: business.lunchboxmoney,//餐盒费
            commodity:commodityArray,
            username: user.name,
            useraddress : userAddress.address,
            usermobile: user.mobile,
            ifaddrive: false,
            ifevaluate: false,
            state:'商家已接单'
        });
        newOrder.save(function (err, order) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
                return;
            }
            res.success(order);
        })
    })

});

router.post('/finishOrder', function (req, res, next) {

    var order = req.body.order;
    OrderEntity.findByIdAndUpdate(order._id,
        {
            $set:{
                ifaddrive: true,
                state:"外卖已送达"
            }
        }, function (err,order) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
                return;
            }
            res.success(order);
        })

});

router.post('/evaluateOrder', function (req, res, next) {

    var order = req.body.order;
    var evaluate = req.body.evaluate;

    OrderEntity.findByIdAndUpdate(order._id,
        {
            $set:{
                ifevaluate: true,
                state:"已点评",
                evaluate: {
                    totalscore: evaluate.totalscore,
                    arrivedtime: evaluate.arrivedtime,
                    commodityscore: [{
                        commodityname: evaluate.commodityscore.commodityname,//商品名
                        commoditynum: evaluate.commodityscore.commoditynum,//数量
                        commodityscore: evaluate.commodityscore.commodityscore
                    }]
                }//评分
            }
        }, function (err,order) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
                return;
            }
            res.success(order);
        })

});

router.post('/deleteOrder', function (req, res, next) {

    var order = req.body.order;

    OrderEntity.findByIdAndRemove( order._id, function (err,item) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
                return;
            }
            res.success(order);
        })

});


module.exports = router;