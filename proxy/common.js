/**
 * Created by Echonessy on 2018/10/19.  config
 */
var request = require('superagent');
var Promise = require("bluebird");
var logger = require('../common/log4node.js');

//拼接url
function getUrlData(url,data) {
    var str = '?';
    if(!data) {
        return url;
    }
    for(var i in data) {
        if(i != 'Headers') {
            if(!data[i]) {
                str+= i+"&"
            } else {
                str+= i+"="+data[i]+"&"
            }
        }
    }
    str = str.substr(0, str.length - 1);
    return encodeURI(url+str);
}

//GET
module.exports.getMethod = function (source_url) {
    return new Promise(function (resolve, reject) {
        request.get(source_url)
            .end(function (err, result) {
                if (err || !result.ok) {
                    reject(err || "响应异常");
                }
                else {
                    console.log("收到响应：");
                    console.log(result.text);
                    resolve(result.text);
                }
            });
    });
};

//POST
module.exports.postMethod = function (source_url, json,req) {
    return new Promise(function (resolve, reject) {
        var  ServerCookie = '';
        if (!json) {
            json = {};
        }
        source_url = getUrlData(source_url,json);
        if(req) {
            if(req.headers) {
                if(req.headers.reqc) {
                    ServerCookie = req.headers.reqc;
                }
            }
        }
        console.log("访问：" + source_url);
        console.log("参数：" + JSON.stringify(json));
        console.log("请求Cookie："+ ServerCookie);
        request.post(source_url)
            .send(json)
            .set('Cookie',ServerCookie)
            .end(function (err, res) {
                if (!res) {
                    reject(new Error("请求没有响应"));
                    logger.error("请求没有响应");
                    return;
                }
                console.log("响应:" + res.text);
                if (err || !res.ok) {
                    reject(err)
                    logger.error(err);
                }
                var obj;
                try {
                    obj = JSON.parse(res.text);
                    resolve(obj);
                } catch (e) {
                    reject(new Error(res.text || '服务端异常！'));
                }
            });
    });
};
//文件上传
module.exports.postFileMethod = function (source_url, json,req) {
    return new Promise(function (resolve, reject) {
        var  ServerCookie = '';
        if (!json) {
            json = {};
        }
        source_url = getUrlData(source_url,json);
        if(req) {
            console.log(req.body)
            if(req.body) {
                if(req.body.header) {
                    ServerCookie = req.body.header
                }
            }
        }
        console.log("访问：" + source_url);
        console.log("参数：" + JSON.stringify(json));
        console.log("请求Cookie："+ ServerCookie);
        request.post(source_url)
            .send(json)
            .set('Cookie',ServerCookie)
            .end(function (err, res) {
                if (!res) {
                    reject(new Error("请求没有响应"));
                    logger.error("请求没有响应");
                    return;
                }
                console.log("响应:" + res.text);
                if (err || !res.ok) {
                    reject(err)
                    logger.error(err);
                }
                var obj;
                try {
                    obj = JSON.parse(res.text);
                    resolve(obj);
                    // if (res.ok && (obj.result=="success")) {
                    //     resolve(obj);
                    // } else {
                    //     reject(new Error(obj.msg || '', obj.reqCode));
                    // }
                } catch (e) {
                    reject(new Error(res.text || '服务端异常！'));
                }
            });
    });
};



