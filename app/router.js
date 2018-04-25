'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/login', controller.home.login);
    //注册
    router.post('/api/register', controller.user.register.register);
    //登录
    router.post('/api/login', controller.user.login.login);
    //验证邮箱
    router.post('/api/valid/email', controller.user.user.validEmail);
    //验证手机号
    router.post('/api/valid/tel', controller.user.user.validTel);
    //获取用户信息
    router.get('/api/user/detail', controller.user.user.findDetail);
};
