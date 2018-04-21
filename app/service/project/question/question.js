const Service = require('egg').Service;
const PageUtil = require('../../../util/page');
const Sql = require('../../../util/sql');
const DB_NAME = 'bg_project_question';

class QuestionService extends Service {
    async listQuestionStatusCountByProjectId(projectId) {
        const sql = `select count(1) as num,question_category from ${DB_NAME} where project_id = ? group by question_category`;
        const projectMembers = await this.app.mysql.query(sql, [projectId]);
        return projectMembers;
    }

    async listNewTrendOfProblems(projectId) {
        const sql = `select count(1) as num,DATE_FORMAT(create_at,'%M-%D') 
                     as date from ${DB_NAME} where project_id = ? and 
                     TIMESTAMPDIFF(day,DATE_FORMAT(create_At,'%Y-%m-%d'), DATE_FORMAT(NOW(),'%Y-%m-%d')) < 30
                    `;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;

    }

    async list(whereInfo, page, size) {
        const pageInfo = PageUtil.getPageInfo(page, size);
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.update_at as update_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id
        ${Sql.generatorWhereSql(whereInfo)}
         limit ?, offset ?`;
        let values = whereInfo.map(item => item.value);
        const list = await this.app.mysql.query(sql, [...values, pageInfo.limit, pageInfo.offset]);
        return list;
    }
}

module.exports = QuestionService;