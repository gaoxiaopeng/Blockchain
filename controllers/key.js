/**
 * Created by Echonessy on 2018/10/19.
 */
const common = require("./common");
const fs = require('fs')
const responseHelper = require('../common/response_helper');



//写入秘钥文件
exports.writeKeyFile = function (req, res) {
    let reqData = req.body;
    let keyJson = reqData.keyJson;
    let alias = reqData.alias;
    let auth = reqData.auth;
    let fileName = './key/'+alias+'_'+auth+'.txt';
    fs.writeFile(fileName, keyJson,(err) => {
        let resData = {}
        resData.result = 'success';
        resData.reqCode = '0000';
        resData.msg = '写入成功';
        if (err) {
            console.log('---------------------err------------------------')
            console.log(err);
            console.log('---------------------err------------------------')
            resData.result = 'fail';
            resData.reqCode = '9999';
            resData.msg = '写入失败,请重试';
        }
        return res.json(resData)
    })
};
//读取
exports.readKeyFile = function (req, res) {
    let reqData = req.body;
    let alias = reqData.alias;
    let auth = reqData.auth;
    let fileName = './key/'+alias+'_'+auth+'.txt';
    fs.readFile( fileName, 'utf8', (err, data) => {
        let resData = {}
        resData.result = 'success';
        resData.reqCode = '0000';
        resData.msg = '读取成功';
        resData.data = data;
        if (err) {
            console.log('---------------------err------------------------')
            console.log(err);
            console.log('---------------------err------------------------')
            resData.result = 'fail';
            resData.reqCode = '9999';
            resData.msg = '文件读取异常';
            resData.data = null;
        }
        return res.json(resData)
    });
};


