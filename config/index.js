//系统通用配置
/**
 * Created by Echonessy on 2018/10/19.  config
 */
const path = require('path');
const config = {
    // debug 为 true 时，用于本地调试
    debug: true,
    // 添加到 html head 中的信息
    site_headers: [],
    site_logo: '/static/img/logo.png', // default is `name`
    site_icon: '/static/img/favicon.ico',
    local:{
        protocol: 'http',
        host: '127.0.0.1',//
        port: 7800
    },
    // 文件上传配置
    upload: {
        maxSize_img:3145728, //图片最大限制3M
        maxSize_file:31457280 //文件最大限制30M
        // maxSize_file:10485760 //文件最大限制10M
    },
    //后台服务端url
    javaServerUrl:'http://39.96.22.77:8080',
    expires: 200 * 60 * 1000,
    ttl:60*60,//过期时间 秒
    session_secret: 'SDFKSBSDMDCLJOISSJDFHSJDHFASJ',
    auth_cookie_name: 'SESSIONID',
    newrelic_key: 'yourkey',
    maxParallel:10//express层定时、轮询功能最大并发数
};


module.exports = config;


