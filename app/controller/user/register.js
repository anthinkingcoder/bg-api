'use strict';
const BaseController = require('../base');
const Valid = require('../../util/valid');
const ReponseStatus = require('../../model/response_status');

class RegisterController extends BaseController {
    async register() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const UserService = ctx.service.user;
        let user = {
            email: body.email,
            tel: body.tel,
            password: body.password,
            name: body.name,
            company_name: body.company_name,
            work: body.work
        };
        if (!Valid.validEmail(user.email)) {
            this.error(ReponseStatus.ARGUMENT_ERROR, '邮箱未通过校验');
        } else if (!Valid.validTel(user.tel)) {
            this.error(ReponseStatus.ARGUMENT_ERROR, '手机号码未通过校验');
        } else {
            const result = await UserService.create(user);
            if (result) {
                delete user.password;
                this.success(user);
            } else {
                this.error(ReponseStatus.DB_ERROR, '操作失败');
            }
        }

    }
}

module.exports = RegisterController;