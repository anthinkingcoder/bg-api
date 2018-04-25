'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');

class MemberController extends BaseController {
    async listMember() {
        const ctx = this.ctx;
        const query = ctx.query;
        const memberService = ctx.service.project.member;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await memberService.listByProjectId(projectId);
            this.success(list);
        } else {
            this.error(ReponseStatus.NOT_FOUND, '项目不存在');
        }
    }
}

module.export = MemberController;