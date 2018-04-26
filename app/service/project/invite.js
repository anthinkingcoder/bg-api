const Service = require('egg').Service;
const DB_NAME = 'bg_project_member_invite';
const Hash = require('../../util/hash');

class MemberInviteService extends Service {
    async create(inviteMember) {
        inviteMember = this.initInviteMember(inviteMember);
        inviteMember.key = Hash.md5(`${inviteMember.project_id}invite_member`);
        const result = await this.app.mysql.insert(DB_NAME, inviteMember);
        return result.affectedRows === 1;
    }

    async findOne(projectId) {
        const invite = await this.app.mysql.get(DB_NAME, {project_id: projectId});
        return invite;
    }

    initInviteMember(inviteMember) {
        inviteMember.create_at = new Date();
        inviteMember.update_at = inviteMember.create_at;
        return inviteMember;
    }
}

module.exports = MemberInviteService;