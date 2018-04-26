const Service = require('egg').Service;
const DB_NAME = 'bg_project_question_dynamic';
const PageUtil = require('../../../util/page');

class DynamicService extends Service {
    async listQuestionDynamic(memberId, page, size) {
        const pageInfo = PageUtil.getPageInfo(page, size);
        const list = await this.app.mysql.select(DB_NAME, {
            where: {
                member_id: memberId
            },
            limit: pageInfo.limit,
            offset: pageInfo.offset,
            orders: [['create_at', 'desc']]
        });
        return list;
    }

    async listQuestionDynamicByProjectId(projectId, page, size) {
        const list = await this.app.mysql.select(DB_NAME, {
            where: {project_id: projectId},
            orders: [['create_at', 'desc']]
        });
        return list;
    }

    async create(dynamic) {
        dynamic = this.initDynamic(dynamic);
        const result = await this.app.mysql.insert(DB_NAME, dynamic);
        return result.affectedRows === 1;
    }

    initDynamic(dynamic) {
        dynamic.create_at = new Date();
        dynamic.update_at = user.create_at;
        return dynamic;
    }
}

module.exports = DynamicService;


