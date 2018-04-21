const Service = require('egg').Service;
const DB_NAME = 'bg_project_question_dynamic';
const PageUtil = require('../../../util/page');

class DynamicSerivce extends Service {
    async listQuestionDynamic(page, size) {
        const pageInfo = PageUtil.getPageInfo(page, size);
        const list = await this.app.mysql.select(DB_NAME, {
            limit: pageInfo.limit,
            offset: pageInfo.offset,
            orders: [['create_at', 'desc']]
        });
        return list;
    }

    async listQuestionDynamicByProjectId(projectId, page, size) {
        const pageInfo = PageUtil.getPageInfo(page, size);
        const list = await this.app.mysql.select(DB_NAME, {
            where: {project_id: projectId},
            limit: pageInfo.limit,
            offset: pageInfo.offset,
            orders: [['create_at', 'desc']]
        });
        return list;
    }
}

module.exports = DynamicSerivce;


