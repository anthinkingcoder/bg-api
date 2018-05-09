const Service = require('egg').Service;
const RowsAffect = require('../../model/rows_affect');
const DB_NAME = 'bg_project';

class ProjectService extends Service {
    async create(project) {
        project = this.initProject(project);
        const result = await this.app.mysql.insert(DB_NAME, project);
        console.info(result);
        return new RowsAffect(result.affectedRows === 1, result.insertId);
    }

    async update(project = {}) {
        project.update_at = new Date();
        const result = await this.app.mysql.update(DB_NAME, project);
        return new RowsAffect(result.affectedRows === 1, result.insertId);
    }

    async findById(id) {
        const project = await this.app.mysql.get(DB_NAME, {id: id});
        return project;
    }

    async findDetail(id) {
        const sql = `select bg_project.project_bg as project_bg,
        bg_project.project_name as project_name,
        bg_project.project_summary as project_summary,
        bg_project.id as project_id,
        bg_project.create_at as create_at,
        bg_project.member_num as member_num,
        bg_user.name as name,
        bg_project.create_user_id as user_id from bg_project
         inner join bg_user on bg_project.create_user_id = bg_user.id 
         where bg_project.id = ? limit 0,1
        `
        const project = await this.app.mysql.query(sql, [id])
        return project[0];
    }

    async listByCreateUserId(createUserId) {
        let sql = `select bg_project.project_name as project_name,
         bg_project.id as project_id,
        bg_project.project_bg as project_bg,
        bg_project.project_summary as project_summary,
        bg_project.member_num as member_num,
        bg_user.name from bg_project  
        inner join bg_user on bg_user.id = bg_project.create_user_id where 
         bg_project.create_user_id = ?`;
        const projects = await this.app.mysql.query(sql, [createUserId]);
        return projects;
    }

    async updateMember(projectId, isAdd) {
        let o = isAdd ? '+' : '-';
        let sql = `update bg_project set member_num =  member_num ${o} 1 where id = ?`;
        const result = await this.app.mysql.query(sql, [projectId]);
        return result.affectedRows === 1;
    }

    async listByMemberId(memberId) {
        let sql = `select bg_project.project_name as project_name,
        bg_project.id as project_id,
        bg_project.project_bg as project_bg,
        bg_project.project_summary as project_summary,
        bg_project.member_num as member_num,
        bg_user.name from bg_project  
        inner join bg_user on bg_user.id = bg_project.create_user_id 
         inner join bg_project_member on bg_project.id = bg_project_member.project_id where 
         bg_project_member.member_id = ?`;
        const projects = await this.app.mysql.query(sql, [memberId]);
        return projects;
    }

    async listByProjectName() {
        let sql = `select `
    }


    async addMemberNum(id) {
        const sql = 'update bg_project set member_num = member_num + 1 where id = ?';
        const result = await this.app.mysql.query(sql, [id]);
        return result;
    }

    async reduceMemberNum(id) {
        const sql = 'update bg_project set member_num = member_num - 1 where id = ?';
        const result = await this.app.mysql.query(sql, [id]);
        return result;
    }

    initProject(project) {
        project.create_at = new Date();
        project.update_at = project.create_at;
        project.project_room = 0;
        return project;
    }


}

module.exports = ProjectService;