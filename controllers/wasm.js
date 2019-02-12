/**
 * Created by Echonessy on 2018/12/6.
 */

const crypto = require('crypto');
/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
var encrypt = function (key, iv, data) {
    var cipher = crypto.createCipheriv('aes-128-ctr', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
};
//wasmKey
exports.wasmKey = function (req, res) {
    let reqData = req.body;
    console.log(reqData);
    // let cryptoData = reqData.crypto;
    // let cipher = cryptoData.cipher;
    // let ciphertext = cryptoData.ciphertext;
    // let cipherparams = cryptoData.cipherparams;
    // let iv = cipherparams.iv;
    // let key = reqData.auth;
    // console.log(cipher)
    // console.log(key)
    // console.log(iv)
    // ciphertext = new Buffer(ciphertext, 'base64').toString('binary');
    // let decipher = crypto.createDecipheriv(cipher, key, iv);
    // let decoded = decipher.update(ciphertext, 'binary', 'utf8');
    // decoded += decipher.final('utf8');
    // console.log(decoded);
    return res.json(reqData)
};
/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
var decrypt = function (key, iv, crypted) {
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-128-ctr', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

var key = '751f621ea5c8f930';
console.log('加密的key:', key.toString('hex'));
var iv  = '2624750004598718';
console.log('加密的iv:', iv);
var data = "Hello, nodejs. 演示aes-128-ctr加密和解密";
console.log("需要加密的数据:", data);
var crypted = encrypt(key, iv, data);
console.log("数据加密后:", crypted);
var dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);

var hash = crypto.createHash('sha256').update('Echonessy','utf8').digest('hex')
console.log(hash)