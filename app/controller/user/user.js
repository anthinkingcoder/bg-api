'use strict';
const BaseController = require('../base');
const Valid = require('../../util/valid');
const ReponseStatus = require('../../model/response_status');

class UserController extends BaseController {
    async findDetail() {
        try {
            const ctx = this.ctx;
            const userId = this.user().id;
            const userService = ctx.service.user.user;
            let user = await userService.findByUid(userId);
            delete user.password;
            delete user.salt;
            delete user.create_at;
            delete user.delete_at;
            delete user.update_at;
            this.success(user);
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async validEmail() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const email = body.email;
            const userService = ctx.service.user.user;
            if (!Valid.validEmail(email)) {
                this.error(ReponseStatus.ARGUMENT_ERROR, '邮箱不正确');
                return;
            }

            const result = await userService.findByEmail(email);
            if (result) {
                this.error(ReponseStatus.REPEAT, '邮箱被注册');
            } else {
                this.success();
            }
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async validTel() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const tel = body.tel;
            const userService = ctx.service.user.user;
            if (!Valid.validTel(tel)) {
                this.error(ReponseStatus.ARGUMENT_ERROR, '手机不正确');
                return;
            }

            const result = await userService.findByTel(tel);
            if (result) {
                this.error(ReponseStatus.REPEAT, '手机被注册');
            } else {
                this.success();
            }
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async logout() {
        this.ctx.session = null;
        this.success();
    }
}


module.exports = UserController;