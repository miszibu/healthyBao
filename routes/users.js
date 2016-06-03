var express = require('express');
var router = express.Router();

var RestResult = require('../common/RestResult');
var UserAccountEntity = require('../models/UserAccount').UserAccountEntity;
var UserAddressEntity = require('../models/UserAddress').UserAddressEntity;

/* GET users listing. */
router.post('/register', function (req, res, next) {
    var mobile = req.body.mobile;
    var password = req.body.password;
    var name = req.body.username;
    if (!/1\d{10}/.test(mobile)) {//手机号码格式校验
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "请填写正确的手机格式");
        return;
    }

    if (!password || password.length < 8) {//密码长度校验,此处只做最短校验,不做最长校验和其他复杂度校验
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "密码长度不能少于6位");
        return;
    }

    UserAccountEntity.findOne({mobile: mobile}, '_id', function (err, user) {
        if (err) {//查询异常
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }

        if (user) {//手机号已注册
            res.error(RestResult.BUSINESS_ERROR_CODE, "手机号已注册");
            return;
        }
        var registerUser = new UserAccountEntity({
            mobile: mobile,
            password: password,
            name: name,
            headimage: "../img/bianlidian.jpg"
        });
        //调用实体的实例的保存方法
        registerUser.save(function (err, doc) {
            if (err) {//服务器保存异常
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
                return;
            }

            res.success(doc);

        });

    });

});


router.post('/login', function (req, res, next) {
    var mobile = req.body.mobile;
    var password = req.body.password;

    if (!mobile) {//手机号码格式校验
        if (!/1\d{10}$/.test(mobile)) {//手机号码格式校验
            res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "请填写正确的手机格式");
            return;
        }
    }
    if (!password) {
        res.error(RestResult.ILLEGAL_ARGUMENT_ERROR_CODE, "密码不能为空");
        return;
    }

    UserAccountEntity.findOne({mobile: mobile, password: password}, {password: 0}, function (err, user) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }

        if (!user) {
            res.error(RestResult.BUSINESS_ERROR_CODE, "用户名或密码错误");
            return;
        }
        req.session.sign = true;
        req.session.name = user.mobile;
        req.session.userId = user._id;

        res.success(user);


        //更新登陆状态
        //UserAccountEntity.update({_id: user._id}, {$set: {state: '1'}}).exec();

    });

});

router.post('/showUserAddress', function (req, res, next) {
    var user = req.body.user;

    UserAddressEntity.find({uid: user._id}, function (err, address) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }
        res.success(address);
    });
});

router.post('/addUserAddress', function (req, res, next) {
    var user = req.body.user;
    var address = req.body.address;
    UserAddressEntity.findOneAndUpdate({uid: user._id, address: address.address},
        {
            $set: {
                uid: user._id,//
                name: address.name,//联系人
                sex: address.sex,//性别
                mobile: address.mobile,//手机
                address: address.address//地址
            }
        },
        {new: true, upsert: true},
        function (err, address) {
            if (err) {
                res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
                return;
            }
            res.success(address);
        });
});

router.post('/deleteUserAddress', function (req, res, next) {
    var user = req.body.user;
    var address = req.body.address;
    UserAddressEntity.remove({uid: user._id, address: address.address}, function (err, doc) {
        if (err) {
            res.error(RestResult.SERVER_EXCEPTION_ERROR_CODE, "服务器异常");
            return;
        }
        res.success(address);
    });
});


module.exports = router;
