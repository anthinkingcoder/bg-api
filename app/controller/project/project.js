'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');

class ProjectController extends BaseController {
    async create() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const projectService = ctx.service.project.project;
        const user = this.user();
        let project = {
            bg_name: body.bg_name,
            bg_color: body.bg_color,
            bg_summary: body.bg_summary,
            bg_create_id: user.id
        };

        if (!this.objectNotNull(project)) {
            this.error(ReponseStatus.ARGUMENT_ERROR, '创建项目-参数校验错误');
        } else {
            const result = projectService.create(project);
            if (result) {
                this.success('项目创建成功');
            } else {
                this.error(ReponseStatus.DB_ERROR, '项目创建失败');
            }
        }
    }
}