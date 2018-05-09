const Service = require('egg').Service;
const DB_NAME = 'bg_wiki';

class WikiService extends Service {
    async create(wiki) {
        wiki = this.initWiki(wiki);
        const result = await this.app.mysql.insert(DB_NAME, wiki);
        return result.affectedRows === 1;
    }

    initWiki(wiki) {
        wiki.update_at = new Date();
        wiki.create_at = new Date();
        return wiki;
    }

    async update(wiki) {
        wiki.update_at = new Date();
        const result = await this.app.mysql.update(DB_NAME, wiki);
        return result.affectedRows === 1;
    }

    async delete(id) {
        const result = await this.app.mysql.delete(DB_NAME, {id: id});
        return result.affectedRows === 1;
    }

    async findDetail(id) {
        const sql = `select bg_wiki.name,bg_wiki.model_id,
         bg_wiki.create_user_id as create_user_id,
         a.name as create_user_name,
                  c.name as update_user_name,
             bg_wiki.update_at,
                      bg_wiki.content,
                               bg_wiki.create_at,
         bg_wiki.id from bg_wiki
         inner join bg_user a on a.id = bg_wiki.create_user_id
                 inner join bg_user c on c.id = bg_wiki.update_user_id
                         inner join bg_user on bg_user.id = bg_wiki.create_user_id
         where bg_wiki.id = ?`;
        const wiki = await this.app.mysql.query(sql, [id])
        return wiki[0];
    }

    async listWikiByProjectId(projectId) {
        const sql = `select bg_wiki.name as name,
        b.model_name as model_name,
        bg_wiki.project_id as project_id,
         bg_wiki.model_id as model_id,
         bg_wiki.create_user_id as create_user_id,
         bg_wiki.id
          from bg_wiki
        left join bg_model b on b.id = bg_wiki.model_id 
        where bg_wiki.project_id = ? order by model_name`;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;
    }
}

module.exports = WikiService;

