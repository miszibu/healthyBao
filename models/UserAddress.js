/**
 * Created by muyonghui on 16/5/28.
 */
var base = require('./Base');
var ObjectId = base.ObjectId;
var UserAddressScheme = new base.Schema({
    uid: String,//
    name: String,//联系人
    sex: String,//性别
    mobile: String,//手机
    address: String//地址
});
UserAddressScheme.index({mobile:1},{"background" : true});//设置索引
var UserAddressEntity = base.mongoose.model('UserAddressEntity',UserAddressScheme,'useraddress');//指定在数据库中的collection名称为usersaccount
exports.UserAddressEntity  = UserAddressEntity;//导出UserAccountEntity实体