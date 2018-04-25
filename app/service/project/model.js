const Service = require('egg').Service;
const DB_NAME = 'bg_model';

class ModelService extends Service {
    async create(model) {
        const result = await this.app.mysql.insert(DB_NAME, model);
        return result.rowsAffected === 1;
    }

    async update(model) {
        const result = await this.app.mysql.update(DB_NAME, model);
        return result.rowsAffected === 1;
    }

    async delete(id) {
        const result = await this.app.mysql.delete(DB_NAME, {id: id});
        return result.rowsAffected === 1;
    }

    async listAll(projectId) {
        const list = await this.app.mysql.query(DB_NAME, {project_id: projectId});
        return list;
    }

    async findById(id) {
        const model = await this.app.mysql.get(DB_NAME, {id: id});
        return model;
    }
}

module.exports = ModelService;
