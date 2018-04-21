'use strict';

const {app, assert} = require('egg-mock/bootstrap');
describe('test/app/service/user.test.js/findOne', () => {

    it('should get exists user', async () => {
        // 创建 ctx
        const ctx = app.mockContext();
        // 通过 ctx 访问到 service.user
        const user = await ctx.service.user.findByUid(1);
        console.info(user);
        assert(user);
        assert(user.name === 1);
    });

    it('should get null when user not exists', async () => {
        const ctx = app.mockContext();
        const user = await ctx.service.user.findByUid('fengmk1');
        assert(!user);
    });
});

describe('test/app/service/user.test.js/create', () => {
    it('shoule create user', async () => {
        const ctx = app.mockContext();
        const result = await ctx.service.user.create({
            tel: "15616264296",
            email: "837769723@qq.com",
            name: 'zhoulin',
            company_name: '2264',
            work: '前端工程师',
            password: '837769723'
        })
        assert(result === true);
    })
})
