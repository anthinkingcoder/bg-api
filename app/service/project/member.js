const Service = require('egg').Service;
const DB_NAME = 'bg_project_member';

class MemberService extends Service {
    async create(project) {
    }

    async listByMemberId(memberId) {
        const projectMembers = await this.app.mysql.select(DB_NAME, {
            where: {member_id: memberId}
        });
        return projectMembers;
    }

    async listByProjectId(projectId) {
        const sql = 'select bg_user.name as name, bg_user.head_img as head_img, bg_user.id as member_id from bg_project_member inner join bg_user on bg_user.id = bg_project_member.member_id where bg_project_member.project_id = ?';
        const projectMembers = await this.app.mysql.query(sql, [projectId]);
        return projectMembers;
    }

    initProject(project) {
        project.create_at = new Date();
        project.update_at = user.create_at;
        project.room = 0;
        return project;
    }
}

module.exports = MemberService;