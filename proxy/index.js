/**
 * Created by Echonessy on 2018/10/19.  config
 * 主页和合同管理弹窗消息接口
 */
var path = require('path');
var common = require("./common");
// 查询未读信息列表
module.exports.messageUnread = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/message/unread';
    return common.postMethod(reqUrl,data,req);
};
// 修改消息为已读
module.exports.messageUpdateRead = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/message/updateRead';
    return common.postMethod(reqUrl,data,req);
};
// 首页统计
module.exports.contractCount = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/count';
    return common.postMethod(reqUrl,data,req);
};
// 查询我发起的合同信息（只支持已完成和被拒签查询）
module.exports.contractInitiate = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/initiate';
    return common.postMethod(reqUrl,data,req);
};
// 查询合同详细信息
module.exports.contractInfo = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/info';
    return common.postMethod(reqUrl,data,req);
};

// 上传合同图片
module.exports.upload1 = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/upload/1';
    return common.postFileMethod(reqUrl,data,req);
};
// 上传用户信息图片
module.exports.upload2 = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/upload/2';
    return common.postFileMethod(reqUrl,data,req);
};
// 上传合同PDF解析成jpg图片
module.exports.upload3 = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/upload/3';
    return common.postFileMethod(reqUrl,data,req);
};
