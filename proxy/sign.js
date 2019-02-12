/**
 * Created by Echonessy on 2018/12/20.
 */
var path = require('path');
var common = require("./common");


// 增加草稿合同
module.exports.contractAddDraft = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/addDraft';
    return common.postMethod(reqUrl,data,req);
};
// 修改草稿合同,只能修改合同文件地址
module.exports.contractUpdateDraft = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/updateDraft';
    return common.postMethod(reqUrl,data,req);
};
// 获取合同签约短信验证码
module.exports.contractSigningVerifyCode = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/signingVerifyCode';
    return common.postMethod(reqUrl,data,req);
};
// 发起签署
module.exports.contractInitiateSigning = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/initiateSigning';
    return common.postMethod(reqUrl,data,req);
};
// 同意或拒绝签署
module.exports.contractSigning = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/signing';
    return common.postMethod(reqUrl,data,req);
};
// 同意或拒绝签署列表
module.exports.contractSimpleInfo = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/simpleInfo';
    return common.postMethod(reqUrl,data,req);
};
// 签名
module.exports.contractSaveSignature = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/contract/saveSignature';
    return common.postMethod(reqUrl,data,req);
};

// 删除签章
module.exports.contractDeleteSignature = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/signature/delete';
    return common.postMethod(reqUrl,data,req);
};



/**
 * @description 请求标签列表
 * @param {String}  标签
 * @time 2019-1-17
 */
module.exports.getLabelList = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/label/list';
    return common.postMethod(reqUrl,data,req);
};
/**
 * @description 添加标签
 * @param {String} labelName 标签名称
 * @time 2019-1-17
 */
module.exports.addLabel = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/label/add';
    return common.postMethod(reqUrl,data,req);
};
/**
 * @description 修改标签
 * @param {String} labelName 标签名称
 * @param {Int}  id 标签id
 * @time 2019-1-17
 */
module.exports.updateLabel = function (data,req) {
    var url = config.javaServerUrl;
    var reqUrl=url+'/label/update';
    return common.postMethod(reqUrl,data,req);
};





