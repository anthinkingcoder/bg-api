'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');

class MemberInviteController extends BaseController {
    async findOne() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const inviteService = ctx.service.project.invite;
            const projectService = ctx.service.project.project;
            const projectId = query.project_id;
            const project = await projectService.findById(projectId);
            if (project) {
                const invites = await inviteService.findOne(projectId);
                this.success(invites);
            } else {
                this.error(ReponseStatus.NOT_FOUND, '项目不存在');
            }
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }
}

module.exports = MemberInviteController;