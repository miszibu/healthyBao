/**
 * Created by muyonghui on 16/5/28.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var CommodityScheme = new base.Schema({
    businessid: ObjectId,//商家id
    commodityname: String,//名称
    commodityimage: String,//商品图片
    commoditydescribe: String,//商品描述
    commodityprice: {type: Number, default: 0},//单价
    totalscore: {type: Number, default: 0},//评分
    monthlyorder: {type: Number, default: 0}//月定单量

});
CommodityScheme.index({bussinessid:1},{"background" : true});//设置索引
var CommodityEntity = base.mongoose.model('CommodityEntity',CommodityScheme,'commodity');//指定在数据库中的collection名称为usersaccount
exports.CommodityEntity  = CommodityEntity;//导出UserAccountEntity实体