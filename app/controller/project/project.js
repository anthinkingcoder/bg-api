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

    async findOne() {
        const ctx = this.ctx;
        const query = ctx.query;
        const projectId = query.project_id;
        const projectService = ctx.service.project.project;
        const project = await projectService.findById(projectId);
        this.success(project);
    }


    async update() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const projectId = query.project_id;
        const projectService = ctx.service.project.project;
        const project = await projectService.findById(projectId);
        if (!project) {
            this.error(ReponseStatus.NOT_FOUND, '项目不存在');
        } else {
            const result = projectService.update({
                project_name: body.project_name,
                project_bg: body.project_bg,
                project_summary: body.project_summary
            });
            if (result) {
                this.success();
            } else {
                this.error(ReponseStatus.DB_ERROR, '系统异常');
            }
        }
        this.success(project);
    }
}

module.exports = ProjectController;