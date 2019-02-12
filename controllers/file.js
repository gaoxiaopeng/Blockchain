/**
 * Created by Echonessy on 2018/12/24.
 */
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
const http = require('http');
//查询合同详细信息
exports.upload1 = function (req, res) {
    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename)
    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            const meta = {
                'cookie': "JSESSIONID="+req.query.sessionId,
            };
            form.append('file', file)
            console.log(form.getHeaders(meta))
            fetch(config.javaServerUrl+'/upload/1', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                console.log('----------------------responseData--------------------------')
                console.log(json)
                console.log('----------------------responseData--------------------------')
                return res.json(json)
            });
        }
    })
};



//上传用户信息图片
exports.upload2 = function (req, res) {
    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename);
    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            const meta = {
                'cookie': "JSESSIONID="+req.query.sessionId,
            };
            form.append('file', file)
            var header = form.getHeaders();
            fetch(config.javaServerUrl+'/upload/2', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                console.log('----------------------responseData--------------------------')
                console.log(json)
                console.log('----------------------responseData--------------------------')
                return res.json(json)
            });
        }
    })
};
//上传合同PDF解析成jpg图片
exports.upload3 = function (req, res) {
    const { path: filePath, originalFilename } = req.files.file
    const newPath = path.join(path.dirname(filePath), originalFilename)
    fs.rename(filePath, newPath, function (err) {
        if (err) {
            return;
        }
        else {
            const file = fs.createReadStream(newPath)
            const form = new FormData()
            const meta = {
                'cookie': "JSESSIONID="+req.query.sessionId,
            };
            form.append('file', file)
            console.log(form.getHeaders(meta))
            fetch(config.javaServerUrl+'/upload/3', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                console.log('----------------------responseData--------------------------')
                console.log(json);
                console.log('----------------------responseData--------------------------')
                return res.json(json)
            });
        }
    })
};
//上传解析txt
exports.upload4 = function (req, res) {
    var ServerCookie = ''
    if(req) {
        if(req.headers) {
            if(req.headers.reqc) {
                ServerCookie = req.headers.reqc;
            }
        }
    }
    var fileName = './base64/'+req.body.phone+'.txt';
    var str = req.body.url;
    fs.writeFile(fileName, str,(err) => {
        if(!err) {
            const file = fs.createReadStream(fileName)
            const form = new FormData();
            const meta = {
                'cookie':ServerCookie,
            };
            form.append('file', file);
            console.log(form.getHeaders(meta))
            fetch(config.javaServerUrl+'/upload/4', {
                method: "POST",
                headers: form.getHeaders(meta),
                body: form
            }) .then( response =>
                response.json()
            ).then(function (json) {
                fs.unlink(fileName, function (err) {
                    if(!err) {
                        console.log('----------------------responseData--------------------------')
                        console.log(json);
                        console.log('----------------------responseData--------------------------')
                        return res.json(json);
                    } else {
                        let resData = {}
                        resData.result = 'fail';
                        resData.reqCode = '9999';
                        resData.msg = '清除失败,请重试';
                        return res.json(resData);
                    }
                });
            });
        }
    })
};


