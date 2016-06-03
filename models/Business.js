/**
 * Created by muyonghui on 16/5/28.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var BusinessScheme = new base.Schema({
    mobile: String,//手机
    businessname: String,//名称
    businessimage: String,//头像
    businessaddress: String,//商家地址
    distance: Number,//距离
    announcement: String,//公告
    commoditytype: String,//商品品类
    totalscore: {type: Number, default: 0},//总评分
    servicescore: {type: Number, default: 0},//服务评分
    commodityscore: {type: Number, default: 0},//商品评分
    sendmoney: {type: Number, default: 0},//起送价
    delivermoney: {type: Number, default: 0},//配送费
    lunchboxmoney: {type: Number, default: 0},//餐盒费
    delivertime: {type: Number, default: 0},//平均配送时间
    monthlyorder: {type: Number, default: 0}//月定单量

    //createtime:{type:Date,default:Date.now}//创建时间
});
BusinessScheme.index({_id:1},{"background" : true});//设置索引
var BusinessEntity = base.mongoose.model('BusinessEntity',BusinessScheme,'business');//指定在数据库中的collection名称为usersaccount
exports.BusinessEntity  = BusinessEntity;//导出UserAccountEntity实体