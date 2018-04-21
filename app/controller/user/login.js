'use strict';
const BaseController = require('../base');
const ResponseStatus = require('../../model/response_status');
const Hash = require('../../util/hash')

class LoginController extends BaseController {
    async login() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const email = body.email;
        const password = body.password;
        const userService = ctx.service.user.user;
        const user = await userService.findByEmail(email);
        if (!user) {
            this.error(ResponseStatus.NOT_FOUND, '该邮箱未注册');
        } else {
            if (user.password !== Hash.md5(password)) {
                this.error(ResponseStatus.NORMAL_ERROR, '邮箱或者密码不正确');
            } else {
                delete user.password;
                ctx.session.user = user;
                await userService.update({last_login_time: new Date()});
                this.success({
                    email: user.email,
                    tel: user.tel,
                    name: user.name
                });
            }
        }
    }
}

module.exports = LoginController;