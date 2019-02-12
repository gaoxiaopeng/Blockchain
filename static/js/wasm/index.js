/**
 * Created by Echonessy on 2018/12/6.
 */

creat_Key()
function creat_Key() {
    $('#creat_Key').on('click',function () {
        //调用创建秘钥函数
        //alias 秘钥别名
        //auth 密码
        var auth = $("#auth").val();
        var alias = $("#alias").val();
        if(!auth) {layer.msg('请输入密码');return}
        if(!alias) {layer.msg('请输入用户名');return}
        echo.box.loader("生成中....请等待")
        createKeyAuth(alias,auth)
    })
    $('#read_Key').on('click',function () {
        var auth = $("#read_auth").val();
        var alias = $("#read_alias").val();
        if(!auth) {layer.msg('请输入密码');return}
        if(!alias) {layer.msg('请输入用户名');return}
        echo.box.loader("读取中....请等待")
        readKeyFile(alias,auth)
    })
}

//创建私钥公钥
function createKeyAuth(alias,auth) {
    var creData = {alias: alias, auth}
    createKey(creData).then(res => {
        console.log(res.data)
        writeKeyFile(alias,auth,res.data);
        var reqData = JSON.parse(res.data);
        $('#creatKey').html(res.data)
        reqData.auth = auth;
        var signData = {message:"91c3ea050a9226ca95348ba2ed6f98ab6fd8ec1ce43a7b140476592d4406c449", key: res.data, password: auth}
        createSignMessage(signData)
    }).catch(err => {
        echo.box.alert(err)
    })
}

//创建签名
function createSignMessage(signData) {
    signMessage(signData).then(r =>{
        console.log(r)
        $('#signMessage').html(r.data)
        echo.box.close();
    }).catch(err => {
        echo.box.alert(err)
    })
}

//文件写入

function writeKeyFile(alias,auth,keyJson,callback) {
    var SubData = {};
    var Url = '/writeKeyFile';
    SubData.keyJson = keyJson;
    SubData.alias = alias;
    SubData.auth = auth;
    echo.ajax.post(Url,SubData,function (res) {
        console.log(res);
    })
}



//文件读取
function readKeyFile(alias,auth) {
    var SubData = {};
    var Url = '/readKeyFile';
    SubData.alias = alias;
    SubData.auth = auth;
    echo.ajax.post(Url,SubData,function (res) {
        echo.ajax.callback( res,function () {
            echo.box.close();
            $("#read_Key_Data").html(res.data);
        })
    })
}