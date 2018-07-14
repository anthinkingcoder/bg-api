'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');
const email = require('../../util/email');

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

    async sendInviteEmail() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const inviteEmail = query.invite_email;
            const projectId = query.project_id;
            const projectService = ctx.service.project.project;
            const memberInviteService = ctx.service.project.invite;
            const memberService = ctx.service.project.member;
            const userService = ctx.service.user.user;

            const project = await projectService.findById(projectId);
            if (project) {
                const user = await userService.findByEmail(inviteEmail);
                if (user) {
                    if (project.create_user_id == user.id) {
                        this.error(ReponseStatus.REPEAT, '该成员已经加入该项目');
                        return;
                    }
                    const memebr = await memberService.findOne(projectId, user.id);
                    if (memebr) {
                        this.error(ReponseStatus.REPEAT, '该成员已经加入该项目');
                        return;
                    }
                }

                const memberInvite = await memberInviteService.findOne(projectId);
                const inviteKey = `http://127.0.0.1:8081/project/invite/${memberInvite.project_id}/${memberInvite.key}?inviteKey=1`
                const options = {
                    from: '"BugFB" <837769723@qq.com>',
                    to: `${inviteEmail}`,
                    // cc         : ''  //抄送
                    // bcc      : ''    //密送
                    subject: 'BugFB项目管理平台项目邀请',
                    text: 'BugFB项目管理平台项目邀请',
                    html: `<div style="width: 100%;justify-content: center;display: flex;display: -webkit-flex;flex-direction: column"><p style="text-align: center;width: 100%"><span style="font-size: 18px;color: #000;font-weight: bold;">${this.user().name} </span><span style="font-size:14px;color: #a7afb8;"> 邀请您加入 </span><span style="color: #337ab7;font-size: 14px">${project.project_name}</span></p>
                    <a href="${inviteKey}" style="padding: 8px 10px 8px 10px;background-color: #2b85e4;color: #fff;font-size: 14px;text-decoration: none;border-radius: 5px;margin-top: 5px;display: block;text-align: center">点击加入</a></div>`,
                    attachments: []
                };
                let result = await email.sendEmail(options);
                if (result.isSuccess) {
                    this.success('发送成功');
                } else {
                    this.error(result.msg);
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

module.exports = MemberInviteController;