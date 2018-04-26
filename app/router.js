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
    //注销
    router.post('/api/user/logout', controller.user.user.logout);

    //project-我参与的
    router.get('/api/project/listByMemberId', controller.project.project.listByMemberId);
    //project-我创建的
    router.get('/api/project/listByCreateId', controller.project.project.listByCreateUserId);

    //project-join
    router.post('/api/project/member/create', controller.project.member.create);
    //创建project
    router.post('/api/project/create', controller.project.project.create);

    router.get('/api/project/findDetail', controller.project.project.findOne);

    //project-dynamic
    router.get('/api/project/dynamic/listProjectDynamic', controller.project.dynamic.listProjectDynamic);

    //member-invite-find-one
    router.get('/api/project/invite', controller.project.invite.findOne);

    //project-member
    router.get('/api/project/member/listMembers', controller.project.member.listMembers);
    //sta
    router.get('/api/sta/listQuestionStatusCount', controller.project.question.sta.listQuestionStatusCountByProjectId)

    //sta-listNewTrendOfQuestion
    router.get('/api/sta/listNewTrendOfQuestion', controller.project.question.sta.listNewTrendOfQuestion)
};
