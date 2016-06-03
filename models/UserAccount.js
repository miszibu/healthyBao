/**
 * Created by zjh on 2016/3/4.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var UserAccountScheme = new base.Schema({
    mobile: String,//手机(登陆用户名)
    password: String,//密码
    name: String,//姓名
    sex: String,//女 男
    headimage: String,//头像
    createtime:{type:Date,default:Date.now}//创建时间
});
UserAccountScheme.index({mobile:1},{"background" : true});//设置索引
var UserAccountEntity = base.mongoose.model('UserAccountEntity',UserAccountScheme,'usersaccount');//指定在数据库中的collection名称为usersaccount
exports.UserAccountEntity  = UserAccountEntity;//导出UserAccountEntity实体