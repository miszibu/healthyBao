/**
 * Created by muyonghui on 16/5/28.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var OrderScheme = new base.Schema({
    bussinessid: ObjectId,//商家id
    uid: ObjectId,//用户useraccountid
    useraddressid : ObjectId,
    bussinessname: String,
    totalmoney: Number,
    delivermoney: {type: Number, default: 0},//配送费
    lunchboxmoney: {type: Number, default: 0},//餐盒费
    commodity:[{
            commodityid: ObjectId,//商品id
            commodityname: String,//商品名
            commodityprice: {type: Number, default: 0},//单价
            commoditynum: {type: Number, default: 1}//数量
    }],
    username: String,
    useraddress : String,
    usermobile: String,
    ifaddrive: Boolean,
    ifevaluate: Boolean,
    evaluate: {
        totalscore: {type: Number, default: 0},
        arrivedtime: String,
        commodityscore: [{
            commodityname: String,//商品名
            commoditynum: {type: Number, default: 1},//数量
            commodityscore: {type: Number, default: 1}
        }]
    },//评分
    state:String,
    createtime:{type:Date,default:Date.now}//创建时间
});
OrderScheme.index({mobile:1},{"background" : true});//设置索引
var OrderEntity = base.mongoose.model('OrderEntity',OrderScheme,'order');//指定在数据库中的collection名称为usersaccount
exports.OrderEntity  = OrderEntity;//导出UserAccountEntity实体