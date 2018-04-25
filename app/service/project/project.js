const Service = require('egg').Service;
const DB_NAME = 'bg_project';

class ProjectService extends Service {
    async create(project) {
        project = this.initProject(project);
        const result = await this.app.mysql.insert(DB_NAME, project);
        return result.affectedRows === 1;
    }

    async update(project = {}) {
        project.update_at = new Date();
        const result = await this.app.mysql.update(DB_NAME, project);
        return result.rowsAffected === 1;
    }

    async findById(id) {
        const project = await this.app.mysql.get(DB_NAME, {id: id});
        return project;
    }

    async listByCreateUserId(createUserId) {
        const projects = await this.app.mysql.select(DB_NAME, {
            where: {create_user_id: createUserId}
        });
        return projects;
    }

    async listByMemberId(memberId) {
        const projectMembers = await this.ctx.service.projectMemberService.listByMemberId(memberId);
        const projectIds = projectMembers.map((p) => {
            return p.project_id;
        });
        const projects = await this.app.mysql.select(DB_NAME, {
            where: {
                id: projectIds
            }
        });
        return projects;
    }

    initProject(project) {
        project.create_at = new Date();
        project.update_at = user.create_at;
        project.room = 0;
        return project;
    }
}

module.exports = ProjectService;