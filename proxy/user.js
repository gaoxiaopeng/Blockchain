/**
 * Created by Echonessy on 2018/12/20.
 */
var path = require('path');
var common = require("./common");


// 获取用户信息
module.exports.memberinfo = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/info';
    return common.postMethod(reqUrl,data,req);
};
//修改用户信息
module.exports.memberUpdate = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/update';
    return common.postMethod(reqUrl,data,req);
};

//联系人管理列表查询
module.exports.listSearch = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contact/list/search';
    return common.postMethod(reqUrl,data,req);
};
//添加联系人
module.exports.contactAdd = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contact/add';
    return common.postMethod(reqUrl,data,req);
};
//修改联系人备注
module.exports.contactUpdate = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contact/update';
    return common.postMethod(reqUrl,data,req);
};
//查询用户签章
module.exports.signatureInfo = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/signature/info';
    return common.postMethod(reqUrl,data,req);
};
//添加修改签章
module.exports.signatureAdd = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/signature/add';
    return common.postMethod(reqUrl,data,req);
};

