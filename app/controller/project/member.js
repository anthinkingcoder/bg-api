'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');
const DynamicCategory = require('../../model/project_dynamic_category');

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
                head_img: adminUser.head_img,
                name: adminUser.name,
                member_id: adminUser.id,

            });
            this.success({
                list,
                adminList
            });
        } else {
            this.error(ReponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    async exitProject() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const memberService = ctx.service.project.member;
        const projectService = ctx.service.project.project;
        const dynamicService = ctx.service.project.dynamic;
        const projectId = body.project_id;
        const userId = this.user().id;
        const project = await projectService.findById(projectId);
        if (project) {
            if (project.create_user_id == userId) {
                this.error(ReponseStatus.NORMAL_ERROR, '项目创建者不可以退出项目');
                return;
            }
            const result = await memberService.remove(userId, projectId);
            await projectService.reduceMemberNum(projectId);
            if (result) {
                //生成动态
                await dynamicService.create({
                    project_id: projectId,
                    create_user_id: userId,
                    dynamic_category: DynamicCategory.E_PROJECT.name,
                });
                this.success();
            } else {
                this.error(ReponseStatus.DB_ERROR, '退出失败');
            }

        }
    }

    async removeMember() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        const memberService = ctx.service.project.member;
        const projectService = ctx.service.project.project;
        const dynamicService = ctx.service.project.dynamic;
        const projectId = body.project_id;
        const project = await projectService.findById(projectId);
        const userId = this.user().id;
        const memberId = body.member_id;
        if (project) {
            if (project.create_user_id != userId || memberId == project.create_user_id) {
                this.error(ReponseStatus.AUTH_ERROR, '你没有权限');
                return;
            }
            const result = await memberService.remove(memberId, projectId);
            await projectService.reduceMemberNum(projectId);
            if (result) {
                //生成动态
                await dynamicService.create({
                    project_id: projectId,
                    create_user_id: memberId,
                    dynamic_category: DynamicCategory.R_PROJECT.name,
                });
                this.success();
            }else {
                this.error(ReponseStatus.DB_ERROR,'移除失败');
            }
        }
    }



    async create() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const memberService = ctx.service.project.member;
            const projectService = ctx.service.project.project;
            const inviteService = ctx.service.project.invite;
            const dynamicService = ctx.service.project.dynamic;
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
                        await projectService.addMemberNum(projectId);
                        //生成动态
                        await dynamicService.create({
                            project_id: projectId,
                            create_user_id: user.id,
                            dynamic_category: DynamicCategory.J_PROJECT.name,
                        });
                        await projectService.updateMember(projectId, true);
                        if (result) {
                            this.success('邀请成功');
                        } else {
                            this.error(ReponseStatus.DB_ERROR, '邀请失败');
                        }
                    } else {
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