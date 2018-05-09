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

    async listQuestionDynamicByQuestionId(questionId) {
        let sql = `select bg_project_question_dynamic.update_content as update_content,
        bg_project_question_dynamic.update_category as update_category,
        bg_project_question_dynamic.create_user_id as create_user_id,
        bg_user.name as create_user_name,
        bg_project_question_dynamic.create_at as create_at,
        bg_project_question_dynamic.is_comment as is_comment,
        bg_project_question_dynamic.comment_content as comment_content,
        bg_project_question_dynamic.update_field as update_field from bg_project_question_dynamic
         inner join bg_user on bg_user.id = bg_project_question_dynamic.create_user_id where bg_project_question_dynamic.question_id = ? 
         order by bg_project_question_dynamic.create_at asc`;
        const list = await this.app.mysql.query(sql, [questionId]);
        return list;
    }

    async create(dynamic) {
        dynamic = this.initDynamic(dynamic);
        const result = await this.app.mysql.insert(DB_NAME, dynamic);
        return result.affectedRows === 1;
    }

    initDynamic(dynamic) {
        dynamic.create_at = new Date();
        dynamic.update_at = dynamic.create_at;
        return dynamic;
    }
}

module.exports = DynamicService;


