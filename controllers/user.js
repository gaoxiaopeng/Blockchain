/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const user = require('../proxy/user');
const responseHelper = require('../common/response_helper');


//获取用户信息
exports.memberinfo = function (req, res) {
    let reqData = req.body;
    user.memberinfo(reqData,req).then(function (data) {
        var result = data.result;
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//修改用户信息
exports.memberUpdate = function (req, res) {
    let reqData = req.body;
    user.memberUpdate(reqData,req).then(function (data) {
        var result = data.result;
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//联系人管理列表查询
exports.listSearch = function (req, res) {
    let reqData = req.body;
    user.listSearch(reqData,req).then(function (data) {
        var result = data.result;
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//添加联系人
exports.contactAdd = function (req, res) {
    let reqData = req.body;
    user.contactAdd(reqData,req).then(function (data) {
        var result = data.result;
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//修改联系人备注
exports.contactUpdate = function (req, res) {
    let reqData = req.body;
    user.contactUpdate(reqData,req).then(function (data) {
        var result = data.result;
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//查询用户签章
exports.signatureInfo = function (req, res) {
    let reqData = req.body;
    user.signatureInfo(reqData,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//添加修改签章
exports.signatureAdd = function (req, res) {
    var reqData = req.body;
    console.log('---------------reqData----------------')
    console.log(reqData)
    console.log('---------------reqData----------------')
    user.signatureAdd(reqData,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};