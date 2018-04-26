'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');

class MemberController extends BaseController {
    async listMembers() {
        const ctx = this.ctx;
        const query = ctx.query;
        const memberService = ctx.service.project.member;
        const projectService = ctx.service.project.project;
        const userService = ctx.service.user.user;
        const projectId = query.project_id;
        const user = this.user();
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await memberService.listByProjectId(projectId);
            const adminUser = await userService.findByUid(project.create_user_id)
            const adminList = [];
            adminList.push({
                user_id: adminUser.id,
                head_img: adminUser.head_img,
                name: adminUser.name
            });
            this.success({
                list,
                adminList
            });
        } else {
            this.error(ReponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    async create() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const memberService = ctx.service.project.member;
            const projectService = ctx.service.project.project;
            const inviteService = ctx.service.project.invite;
            const projectId = body.project_id;
            const inviteKey = body.key;
            const user = this.user();
            const project = await projectService.findById(projectId);
            if (project) {
                const invite = await inviteService.findOne(projectId);
                if (invite.key === inviteKey) {
                    const one = await memberService.findOne(projectId, user.id);
                    if (!one && user.id !== project.create_user_id) {
                        const result = await memberService.create(user.id, projectId);
                        if (result) {
                            this.success('邀请成功');
                        } else {
                            this.error(ReponseStatus.DB_ERROR, '邀请失败');
                        }
                    }else {
                        this.error(ReponseStatus.REPEAT, '您已经加入该项目');
                    }

                }
            } else {
                this.error(ReponseStatus.NOT_FOUND, '项目不存在');
            }
        } catch (e) {
            console.info(e);
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }
}

module.exports = MemberController;