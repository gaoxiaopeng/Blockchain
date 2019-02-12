/*!Index 路由*/
const express = require('express');
const router = express.Router();
const common = require('../controllers/common');
const index = require('../controllers/index');
const user = require('../controllers/user');
const manage = require('../controllers/manage');
const login = require('../controllers/login');
const key = require('../controllers/key');

// const wasm = require('../controllers/wasm');

router.get(/(^\/$)|^(\/index)/, index.index);


router.get("/wasm", index.wasm);//wasm
//私钥解密
// router.post('/wasmKey',index.wasmKey);
//签名demo
router.get("/signDemo", index.signDemo);
router.get("/uploadDemo", index.uploadDemo);
//异常
router.get("/404", index.i404);//404
router.get("/403", index.i403);//403
router.get("/400", index.i400);//400
router.get("/500", index.i500);//500
router.get("/503", index.i503);//503
//首页
router.get("/", index.index);//首页
//注册
router.get("/register", index.register);//
// 用户中心
router.get("/user", index.user);//

/***********************登录注册*********Start****************/
// 获取登陆短信验证码
router.post("/loginVerifyCode", login.loginVerifyCode);
// 登陆
router.post("/login", login.login);
// 获取注册短信验证码
router.post("/registeredVerifyCode", login.registeredVerifyCode);
// 注册
router.post("/registered", login.registered);
// 校验手机号是否存在
router.post("/checkPhoneExist", login.checkPhoneExist);
// 校验用户是否已登陆
router.post("/isLogin", login.isLogin);
/***********************登录注册*********End****************/




/***********************文件读写*********Start****************/
// 私钥文件写入
router.post("/writeKeyFile", key.writeKeyFile);
// 私钥文件读取
router.post("/readKeyFile", key.readKeyFile);
//
/***********************文件读写*********End****************/




/***********************合同签署*********Start****************/

router.get("/appcode", index.appcode);
/***********************主动发起合同*************************/
//合同签署第一步 设置合同及签署方
router.get("/sign", index.sign);
router.post("/sign", index.sign);
//合同签署第二步  拖拽签名
router.get("/signnext", index.signnext);
router.post("/signnext", index.signnext);
//保存草稿结果页
router.get("/draftsign", index.draftsign);
router.post("/draftsign", index.draftsign);
//发起签署结果页
router.get("/initiatesign", index.initiatesign);
router.post("/initiatesign", index.initiatesign);
//单边签署合同信息
router.get("/signinfo", index.signinfo);
router.post("/signinfo", index.signinfo);

/***********************被动签署合同*************************/
//合同拖拽生成签署合同
router.get("/passivesign", index.passivesign);
router.post("/passivesign", index.passivesign);
//同意签署结果
router.get("/agreesign", index.agreesign);
router.post("/agreesign", index.agreesign);
//同意签署合同详情
router.get("/agreeinfo", index.agreeinfo);
router.post("/agreeinfo", index.agreeinfo);
//拒绝签署结果
router.get("/refusesign", index.refusesign);
router.post("/refusesign", index.refusesign);
//拒绝签署结果详情
router.get("/refuseinfo", index.refuseinfo);
router.post("/refuseinfo", index.refuseinfo);

/***********************合同签署*********End****************/





/***********************合同管理********Start*****************/
//合同签署管理页面
router.get("/manage", manage.index);
//全部文件
router.post("/contractAll", manage.contractAll);
//即将截止
router.post("/contractExpire", manage.contractExpire);
//待我签
router.post("/waitMineList", manage.waitMineList);
//待对方签
router.post("/waitOtherList", manage.waitOtherList);
//已完成
router.post("/completeList", manage.completeList);
//已拒绝
router.post("/refuseList", manage.refuseList);
//草稿箱
router.post("/draftList", manage.draftList);
//删除草稿箱
router.post('/deleteDraft',manage.deleteDraft)
//退出登录
router.post('/memberLoginOut',manage.memberLoginOut)

//2019-1-17 新增功能
//合同标签修改
router.post('/contractUpdateLabel',manage.contractUpdateLabel)
//合同归档
router.post('/contractArchive',manage.contractArchive)




/***********************合同管理********End*****************/


/***********************用户中心********Start*****************/
//获取用户信息
router.post('/memberinfo',user.memberinfo);
//修改用户信息
router.post('/memberUpdate',user.memberUpdate);
//联系人管理列表查询
router.post('/listSearch',user.listSearch);
//添加联系人
router.post('/contactAdd',user.contactAdd);
//修改联系人备注
router.post('/contactUpdate',user.contactUpdate);
//查询用户签章
router.post('/signatureInfo',user.signatureInfo);
//添加修改签章
router.post('/signatureAdd',user.signatureAdd);




/***********************用户中心********End*****************/



/***********************主页和合同管理弹窗消息接口********Start*****************/
//查询未读信息列表
router.post('/messageUnread',index.messageUnread);
//修改消息为已读
router.post('/messageUpdateRead',index.messageUpdateRead);
//首页统计
router.post('/contractCount',index.contractCount);
//查询我发起的合同信息（只支持已完成和被拒签查询）
router.post('/contractInitiate',index.contractInitiate);
//查询合同详细信息
router.post('/contractInfo',index.contractInfo);
/***********************主页和合同管理弹窗消息接口********End*****************/

/***********************文件上传********End*****************/
var mutipart= require('connect-multiparty');
var mutipartMiddeware = mutipart();
var file = require('../controllers/file')
//查询合同详细信息
router.post('/upload1',mutipartMiddeware,file.upload1);
//上传用户信息图片
router.post('/upload2',mutipartMiddeware,file.upload2);
//上传合同PDF解析成jpg图片
router.post('/upload3',mutipartMiddeware,file.upload3);
//上传合同txt解析成jpg图片
router.post('/upload4',mutipartMiddeware,file.upload4);
const sign = require('../controllers/sign');
/***********************主动合同签署********Start*****************/
// 增加草稿合同
router.post('/contractAddDraft',sign.contractAddDraft);
// 修改草稿合同,只能修改合同文件地址
router.post('/contractUpdateDraft',sign.contractUpdateDraft);
// 获取合同签约短信验证码
router.post('/contractSigningVerifyCode',sign.contractSigningVerifyCode);
// 发起签署
router.post('/contractInitiateSigning',sign.contractInitiateSigning);
// 同意或拒绝签署
router.post('/contractSigning',sign.contractSigning);
//同意或拒绝签署列表
router.post('/contractSimpleInfo',sign.contractSimpleInfo);

//获取标签列表  2019-1-17 新增
router.post('/labeList',sign.getLabelList);
//添加标签  2019-1-17 新增
router.post('/addLabel',sign.addLabel);


/***********************主动合同签署********End*****************/
//签名
router.post('/contractSaveSignature',sign.contractSaveSignature);
//删除签章
router.post('/contractDeleteSignature',sign.contractDeleteSignature);


module.exports = router;