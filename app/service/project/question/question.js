const Service = require('egg').Service;
const PageUtil = require('../../../util/page');
const Sql = require('../../../util/sql');
const DB_NAME = 'bg_project_question';
const DynamicCategory = require('../../../model/dynamic_category');
const QuestionCategory = require('../../../model/question_category');
const QuestionStatus = require('../../../model/question_status');
const QuestionPriority = require('../../../model/question_priority');

class QuestionService extends Service {

    async listByProjectIdAndPointerId(projectId, pointerId) {
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.update_at as update_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
                       c.model_name as model_name,
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id 
            inner join bg_model as c on c.project_id = bg_project_question.project_id where 
            bg_project_question.project_id = ? and 
            bg_project_question.pointer_user_id = ?`;
        const list = await this.app.mysql.query(sql, [projectId, pointerId]);
        return list;
    }

    async listByProjectIdAndCreateUserId(projectId, userId) {
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.update_at as update_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
                c.model_name as model_name,
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id 
            inner join bg_model as c on c.project_id = bg_project_question.project_id where  
             bg_project_question.project_id = ? and 
            bg_project_question.create_user_id = ?`;
        const list = await this.app.mysql.query(sql, [projectId, userId]);
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
                          c.model_name as model_name,
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id 
            inner join bg_model as c on c.project_id = bg_project_question.project_id 
        ${Sql.generatorWhereSql(whereInfo, "bg_project_question")}
         limit ?, offset ?`;
        let values = [];
        whereInfo.forEach(item => {
            if (Array.isArray(item)) {
                values.concat(item);
            } else {
                values.push(item);
            }
        });
        const list = await this.app.mysql.query(sql, [...values, pageInfo.limit, pageInfo.offset]);
        return list;
    }


    async findOneById(id) {
        const result = await this.app.mysql.get(DB_NAME, {id: id});
        return result.rowsAffected === 1;
    }

    async findDetailById(id) {
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                     bg_project_question_question_summary as question_summary,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.update_at as update_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
                       bg_project_question.model_id as model_id 
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id where bg_project_question.id = ?`;
        const question = await this.app.mysql.query(sql, [id]);
        return question;
    }

    async update(question, userId, field) {
        question.update_at = new Date();
        const result = await this.app.mysql.beginTransactionScope(async coon => {
            await coon.update(DB_NAME, question);
            const updateContent = await this.getUpdateContent(field, value);
            await coon.update('bg_project_question_dynamic', {
                question_id: question.question_id,
                create_user_id: userId,
                update_category: field,
                update_content: updateContent
            });
            return {success: true};
        }, this.ctx);
        return result.success;
    }

    async getUpdateContent(field, value) {
        switch (field) {
            case DynamicCategory.POINTER_USER_ID:
                const userService = this.service.user.user;
                const pointer = await userService.findById(value);
                return pointer.name;
            case DynamicCategory.MODEL_NAME:
                const modelService = this.service.project.model;
                const model = await modelService.findById(value);
                return model.name;
            case DynamicCategory.QUESTION_CATEGORY:
                return QuestionCategory.getEnums(value);
            case DynamicCategory.QUESTION_PRIORITY:
                return QuestionPriority.getEnums(value);
            case DynamicCategory.QUESTION_STATUS:
                return QuestionStatus.getEnums(value);
        }
        return value;
    }
}

module.exports = QuestionService;