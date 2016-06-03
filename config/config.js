/**
 * Created by zjh on 16/03/04.
 */

var mongoose = require('mongoose');//引入mongoose库
mongoose.connect('mongodb://localhost:27017/shuanglema');//mongodb连接地址,demo为数据库名称,默认mongodb连接不需要密码
exports.mongoose = mongoose;//导出mongoose对象



//配置需要登陆认证的访问路径
//exports.needLoginUrlRegs = [
//    /^(\/)+app(\/)+status(\/)+compose_status/,
//    /^(\/)+iv1(\/)+profile/,
//    /^(\/)+iv1(\/)+rule/,
//    /^(\/)+iv1(\/)+crawler(\/)getLoginPage/,
//    /^(\/)+iv1(\/)+crawler(\/)loginFetchData/,
//    /^(\/)+iv1(\/)+courseClass/,
//    /^(\/)+iv1(\/)+question/,
//    /^(\/)+iv1(\/)+redPacket/
//];
