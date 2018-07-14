const Service = require('egg').Service;
const PageUtil = require('../../../util/page');
const Sql = require('../../../util/sql');
const DB_NAME = 'bg_project_question';
const DynamicCategory = require('../../../model/dynamic_category');
const QuestionCategory = require('../../../model/question_category');
const QuestionStatus = require('../../../model/question_status');
const QuestionPriority = require('../../../model/question_priority');
const Dates = require('../../../util/dates');

class QuestionService extends Service {

    async listByProjectIdAndPointerId(projectId, pointerId) {
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.question_category as question_category,
                       bg_project_question.update_at as update_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
                       c.model_name as model_name
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id 
            left join bg_model as c on c.id = bg_project_question.model_id where 
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
                       bg_project_question.question_category as question_category,
                       bg_project_question.update_at as update_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
                c.model_name as model_name
         from bg_project_question inner join bg_user as a on a.id = bg_project_question.create_user_id  
            inner join bg_user as b on b.id = bg_project_question.pointer_user_id 
            left join bg_model as c on c.id = bg_project_question.model_id where  
             bg_project_question.project_id = ? and 
            bg_project_question.create_user_id = ?`;
        const list = await this.app.mysql.query(sql, [projectId, userId]);
        return list;
    }

    async list(whereInfo, page, size, order) {
        const pageInfo = PageUtil.getPageInfo(page, size);
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.question_category as question_category,
                       bg_project_question.update_at as update_at,
                       bg_project_question.finished_at as finished_at,
                       a.name as create_user_name,
                       b.name as pointer_user_name,
                          c.model_name as model_name
         from bg_project_question 
         inner join bg_user as a on a.id = bg_project_question.create_user_id  
            left join bg_user as b on b.id = bg_project_question.pointer_user_id 
            left join bg_model as c on c.id = bg_project_question.model_id 
        ${Sql.generatorWhereSql(whereInfo, "bg_project_question")}
         order by ${DB_NAME}.${order.key} ${order.sort}
         limit ?, ?`;
        console.info([order])
        const list = await this.app.mysql.query(sql, [...Sql.valueToArray(whereInfo), pageInfo.limit, pageInfo.offset]);
        return list;
    }

    async count(whereInfo) {
        const pageInfo = PageUtil.getPageInfo();
        let sql = `select count(*) as count 
         from bg_project_question 
        ${Sql.generatorWhereSql(whereInfo, "bg_project_question")}
        `;
        const count = await this.app.mysql.query(sql, [...Sql.valueToArray(whereInfo)]);
        return count;
    }


    async findOneById(id) {
        const result = await this.app.mysql.get(DB_NAME, {id: id});
        return result.rowsAffected === 1;
    }

    async findDetailById(id) {
        let sql = `select bg_project_question.question_name as question_name,
                     bg_project_question.id as id,
                     bg_project_question.question_summary as question_summary,
                       bg_project_question.question_status as question_status,
                       bg_project_question.question_priority as question_priority,
                       bg_project_question.question_category as question_category,
                       bg_project_question.update_at as update_at,
                       bg_project_question.finished_at as finished_at,
                       bg_project_question.create_at as create_at,
                       a.name as create_user_name,
                       a.id as create_user_id,
                       b.name as pointer_user_name,
                        b.id as pointer_user_id,
                       bg_project_question.model_id as model_id,
                          c.model_name as model_name
         from bg_project_question 
         inner join bg_user as a on a.id = bg_project_question.create_user_id  
            left join bg_user as b on b.id = bg_project_question.pointer_user_id 
            left join bg_model as c on c.id = bg_project_question.model_id 
             where bg_project_question.id = ?`;
        const question = await this.app.mysql.query(sql, [id]);
        return question;
    }

    async update(question, userId, field) {
        question.update_at = new Date();
        //handler date
        if (field.toUpperCase() === DynamicCategory.FINISHED_AT.name) {
            question[field] = Dates.strToDate(question[field]);
        }
        const result = await this.app.mysql.beginTransactionScope(async coon => {
            await coon.update(DB_NAME, question);
            const update = await this.getUpdateContent(field, question[field],question);
            await coon.insert('bg_project_question_dynamic', {
                question_id: question.id,
                create_user_id: userId,
                update_category: update[0],
                update_content: update[1],
                update_field: field,
                create_at: new Date(),
                update_at: new Date(),
                is_comment: 0
            });
            return {success: true};
        }, this.ctx);
        return result.success;
    }

    async getUpdateContent(field, value) {
        switch (field.toUpperCase()) {
            case DynamicCategory.POINTER_USER_ID.name:
                const userService = this.service.user.user;
                if (!value) {
                    return [DynamicCategory.POINTER_USER_ID.message, '未指定']
                } else {
                    const pointer = await userService.findByUid(value);
                    return [DynamicCategory.POINTER_USER_ID.message, pointer.name];
                }

            case DynamicCategory.MODEL_ID.name:
                if (!value) {
                    return [DynamicCategory.MODEL_ID.message, '未指定']
                } else {
                    const modelService = this.service.project.model;
                    const model = await modelService.findById(value);
                    return [DynamicCategory.MODEL_ID.message, model.model_name];
                }

            case DynamicCategory.QUESTION_CATEGORY.name:
                return [DynamicCategory.QUESTION_CATEGORY.message, QuestionCategory.getEnums(value).name];
            case DynamicCategory.QUESTION_PRIORITY.name:
                return [DynamicCategory.QUESTION_PRIORITY.message, QuestionPriority.getEnums(value).name];
            case DynamicCategory.QUESTION_STATUS.name:
                return [DynamicCategory.QUESTION_STATUS.message, QuestionStatus.getEnums(value).name];
            case DynamicCategory.QUESTION_NAME.name:
                return [DynamicCategory.QUESTION_NAME.message, value];
            case DynamicCategory.QUESTION_SUMMARY.name:
                return [DynamicCategory.QUESTION_SUMMARY.message, value];
            case DynamicCategory.FINISHED_AT.name:
                return [DynamicCategory.FINISHED_AT.message, Dates.toDate(value)];
        }
        return value;
    }

    async create(question) {
        question = this.initQuestion(question);
        const result = await this.app.mysql.insert(DB_NAME, question);
        console.info(result);
        return result.affectedRows === 1;
    }

    async findById(id) {
        const question = await this.app.mysql.get(DB_NAME, {
            id: id
        });
        console.info(question);
        return question;
    }

    initQuestion(question) {
        question.question_status = QuestionStatus.NEW.state;
        question.create_at = new Date();
        question.update_at = question.create_at;
        return question;
    }
}

module.exports = QuestionService;