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

    router.post('/api/project/question/create', controller.project.question.question.create);

    router.post('/api/project/question/list', controller.project.question.question.list);


    router.get('/api/project/question/findDetail', controller.project.question.question.findDetail);


    router.post('/api/project/question/update', controller.project.question.question.update);

    router.get('/api/project/dynamic/listQuestionDynamic', controller.project.question.dynamic.listQuestionDynamicByQuestionId);

    router.post('/api/project/question/dynamic/comment/create', controller.project.question.dynamic.createComment);

    router.get('/api/sta/listNewTrendOfQuestionCategory', controller.project.question.sta.listNewTrendOfQuestionCategory);

    router.get('/api/sta/listMemberAndQuestionDistribution', controller.project.question.sta.listMemberAndQuestionDistribution);

    router.get('/api/sta/listMemberWorkSchedule', controller.project.question.sta.listMemberWorkSchedule);

    router.get('/api/sta/listQuestionPriorityCount', controller.project.question.sta.listQuestionPriorityCount);

    router.get('/api/sta/listMemberQuestionRadio', controller.project.question.sta.listMemberQuestionRadio);

    router.get('/api/sta/listWorkScheduleCount', controller.project.question.sta.listWorkScheduleCount);

    router.get('/api/sta/listModel', controller.project.question.sta.listModel);

    router.get('/api/project/question/listByProjectIdAndCreateUserId', controller.project.question.question.listByProjectIdAndCreateUserId);

    router.get('/api/project/question/listByProjectIdAndPointerId', controller.project.question.question.listByProjectIdAndPointerId);

    router.get('/api/project/model/listAll', controller.project.model.listAll);

    router.post('/api/project/model/create', controller.project.model.create);

    router.post('/api/project/model/update', controller.project.model.update);


    router.get('/api/project/wiki/findDetail', controller.project.wiki.findDetail);

    router.post('/api/project/wiki/create', controller.project.wiki.create);

    router.post('/api/project/wiki/update', controller.project.wiki.update);

    router.get('/api/project/wiki/listAll', controller.project.wiki.listAll);

    router.post('/api/project/update', controller.project.project.update);

    router.post('/api/project/exit', controller.project.member.exitProject);

    router.post('/api/project/removeMember', controller.project.member.removeMember);

    router.get('/api/project/hasJoin', controller.project.project.hasJoin);

    router.get('/api/email/invite', controller.project.invite.sendInviteEmail);
};
