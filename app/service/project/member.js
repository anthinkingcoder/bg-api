const Service = require('egg').Service;
const DB_NAME = 'bg_project_member';

class MemberService extends Service {
    async create(uid, projectId) {
        const o = this.initMember(uid, projectId);
        const result = await this.app.mysql.insert(DB_NAME, o);
        return result.affectedRows === 1;
    }

    async remove(uid, projectId) {
        const result = await this.app.mysql.delete(DB_NAME, {
            member_id: uid,
            project_id: projectId
        });
        console.info(result);
        return result.affectedRows === 1;
    }

    async listByMemberId(memberId) {
        const projectMembers = await this.app.mysql.select(DB_NAME, {
            where: {member_id: memberId}
        });
        return projectMembers;
    }

    async listByProjectId(projectId) {
        const sql = `select bg_user.name as name,
         bg_user.head_img as head_img,
         bg_user.email as email,
          bg_user.id as member_id from bg_project_member
           inner join bg_user on bg_user.id = bg_project_member.member_id
            where bg_project_member.project_id = ?`;
        const projectMembers = await this.app.mysql.query(sql, [projectId]);
        return projectMembers;
    }

    initMember(uid, projectId) {
        let o = {};
        o.member_id = uid;
        o.project_id = projectId;
        o.create_at = new Date();
        o.update_at = o.create_at;
        return o;
    }

    async findOne(projectId, memberId) {
        const one = await this.app.mysql.get(DB_NAME, {
            project_id: projectId,
            member_id: memberId
        });
        return one;
    }
}

module.exports = MemberService;