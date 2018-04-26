const Service = require('egg').Service;
const DB_NAME = 'bg_project_dynamic';
const PageUtil = require('../../util/page');

class DynamicService extends Service {
    async listProjectDynamic(projectId, page, size) {
        const pageInfo = PageUtil.getPageInfo(page, size);
        const sql = `select bg_project_dynamic.project_id as project_id,
        bg_project_dynamic.dynamic_category as dynamic_category,
        bg_user.name as name, bg_project_dynamic.create_user_id as user_id,
        bg_user.head_img as head_img,  
        bg_project_dynamic.create_at as create_at  
        from bg_project_dynamic inner join bg_user on bg_user.id = bg_project_dynamic.create_user_id
         where bg_project_dynamic.project_id = ? order by bg_project_dynamic.create_at desc limit ?,?`;
        const list = await this.app.mysql.query(sql, [projectId, pageInfo.limit, pageInfo.offset]);
        return list;
    }


    async create(dynamic) {
        dynamic = this.initDynamic(dynamic);
        const result = await this.app.mysql.insert(DB_NAME, dynamic);
        return result.rowsAffected === 1;
    }

    initDynamic(dynamic) {
        dynamic.create_at = new Date();
        dynamic.update_at = dynamic.create_at;
        return dynamic;
    }
}

module.exports = DynamicService;


