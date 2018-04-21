'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/login', controller.home.login);
    //注册
    router.get('/api/register', controller.user.register.register);
    //登录
    router.get('/api/login', controller.user.login.login);
};
