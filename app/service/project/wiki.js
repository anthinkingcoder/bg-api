const Service = require('egg').Service;
const DB_NAME = 'bg_wiki';


class WikiService extends Service {
    async create(wiki) {
        wiki = this.initWiki(wiki);
        const result = this.app.mysql.insert(DB_NAME, wiki);
        return result.rowsAffected === 1;
    }

    initWiki(wiki) {
        wiki.update_at = new Date();
        wiki.create_at = new Date();
    }

    async update(wiki) {
        const result = this.app.mysql.update(DB_NAME, wiki);
        return result.rowsAffected === 1;
    }

    async delete(id) {
        const result = this.app.mysql.delete(DB_NAME, {id: id});
        return result.rowsAffected === 1;
    }

    async listWikiByProjectId(projectId) {

    }
}

module.exports = WikiService;

