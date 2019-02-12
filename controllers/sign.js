/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const sign = require('../proxy/sign');
const responseHelper = require('../common/response_helper');

//增加草稿合同
exports.contractAddDraft = function (req, res) {
    let reqData = req.body;
    sign.contractAddDraft(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//修改草稿合同,只能修改合同文件地址
exports.contractUpdateDraft = function (req, res) {
    let reqData = req.body;
    sign.contractUpdateDraft(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//获取合同签约短信验证码
exports.contractSigningVerifyCode = function (req, res) {
    let reqData = req.body;
    sign.contractSigningVerifyCode(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//发起签署
exports.contractInitiateSigning = function (req, res) {
    let reqData = req.body;
    sign.contractInitiateSigning(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//同意或拒绝签署
exports.contractSigning = function (req, res) {
    let reqData = req.body;
    sign.contractSigning(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};//同意或拒绝签署列表
exports.contractSimpleInfo = function (req, res) {
    let reqData = req.body;
    sign.contractSimpleInfo(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};//签名
exports.contractSaveSignature = function (req, res) {
    let reqData = req.body;
    sign.contractSaveSignature(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//删除签章
exports.contractDeleteSignature = function (req, res) {
    let reqData = req.body;
    sign.contractDeleteSignature(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};

//标签列表
exports.getLabelList = function (req, res) {
    let reqData = req.body;
    sign.getLabelList(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//添加标签
exports.addLabel = function (req, res) {
    let reqData = req.body;
    sign.addLabel(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};
//修改标签
exports.updateLabel = function (req, res) {
    let reqData = req.body;
    sign.updateLabel(reqData ,req).then(function (data) {
        return res.json(data);
    }).catch(function (e) {
        return responseHelper.serverExceptionTip(res, e.message);
    });
};



