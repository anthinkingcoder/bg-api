'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');
const DynamicCategory = require('../../model/project_dynamic_category');

class ProjectController extends BaseController {

    async hasJoin() {
        const ctx = this.ctx;
        const query = ctx.query;
        const project_id = query.project_id;
        const user = this.user();
        const projectService = ctx.service.project.project;
        const memberService = ctx.service.project.member;
        const project = await projectService.findById(project_id);
        if (project) {
            if (user.id == project.create_user_id) {
                this.success({
                    isJoin: true,
                    isAdmin: true
                })
            } else {
                const member = await memberService.findOne(project_id, user.id);
                if (member) {
                    this.success({
                        isJoin: false,
                        isAdmin: false
                    })
                } else {
                    this.error(ReponseStatus.AUTH_ERROR, '未加入');
                }
            }
        }
    }

    async create() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const projectService = ctx.service.project.project;
        const dynamicService = ctx.service.project.dynamic;
        const memberInviteService = ctx.service.project.invite;
        const user = this.user();
        let project = {
            project_name: body.project_name,
            project_bg: body.project_bg,
            project_summary: body.project_summary,
            create_user_id: user.id
        };

        if (!this.objectNotNull(project)) {
            this.error(ReponseStatus.ARGUMENT_ERROR, '创建项目-参数校验错误');
        } else {
            const result = await projectService.create(project);
            if (result.success) {
                //生成动态
                await dynamicService.create({
                    project_id: result.insertId,
                    create_user_id: user.id,
                    dynamic_category: DynamicCategory.C_PROJECT.name,
                });
                //生成邀请
                await memberInviteService.create({
                    project_id: result.insertId
                });
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
        const project = await projectService.findDetail(projectId);
        project.isMe = this.user().id === project.user_id;
        this.success(project);
    }

    async listByMemberId() {
        const ctx = this.ctx;
        const projectService = ctx.service.project.project;
        const userId = this.user().id;
        const list = await projectService.listByMemberId(userId);
        this.success(list);
    }

    async listByCreateUserId() {
        const ctx = this.ctx;
        const projectService = ctx.service.project.project;
        const userId = this.user().id;
        const list = await projectService.listByCreateUserId(userId);
        this.success(list);
    }

    async listByProjectName() {

    }


    async update() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const projectId = body.project_id;
            const projectService = ctx.service.project.project;
            const project = await projectService.findById(projectId);
            if (!project) {
                this.error(ReponseStatus.NOT_FOUND, '项目不存在');
            } else {
                const result = projectService.update({
                    project_name: body.project_name,
                    project_bg: body.project_bg,
                    project_summary: body.project_summary,
                    id: projectId
                });
                if (result) {
                    this.success();
                } else {
                    this.error(ReponseStatus.DB_ERROR, '系统异常');
                }
            }
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }
}

module.exports = ProjectController;