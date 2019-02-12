/**
 * Created by Echonessy on 2018/10/19.  config
 */
var path = require('path');
var common = require("./common");

//全部列表
module.exports.contractAll = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/all';
    return common.postMethod(reqUrl,data,req);
};

//即将截止
module.exports.contractExpire = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/expire';
    return common.postMethod(reqUrl,data,req);
};

//待我签
module.exports.waitMineList = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/waitmine';
    return common.postMethod(reqUrl,data,req);
};

//待对方签
module.exports.waitOtherList = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/waitother';
    return common.postMethod(reqUrl,data,req);
};

//已完成
module.exports.completeList = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/complete';
    return common.postMethod(reqUrl,data,req);
};

//已拒绝
module.exports.refuseList = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/refuse';
    return common.postMethod(reqUrl,data,req);
};

//草稿箱
module.exports.draftList = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/draft';
    return common.postMethod(reqUrl,data,req);
};
//删除草稿箱
module.exports.deleteDraft = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/delete';
    return common.postMethod(reqUrl,data,req);
};

/**
 * @description   修改合同标签
 * @param {Int} id, 合同id
 * @param {Int} labelId 标签id
 */

module.exports.contractUpdateLabel = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/updateLabel';
    return common.postMethod(reqUrl,data,req);
};

/**
 * @description   合同归档
 * @param {Int} id, 合同id
 */

module.exports.contractArchive = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/archive';
    return common.postMethod(reqUrl,data,req);
};
/**
 * @description   退出登录
 * @param {Int} id, 合同id
 */

module.exports.memberLoginOut = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/member/loginOut';
    return common.postMethod(reqUrl,data,req);
};




