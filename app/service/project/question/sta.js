const Service = require('egg').Service;
const PageUtil = require('../../../util/page');
const Sql = require('../../../util/sql');
const DB_NAME = 'bg_project_question';

class Sta extends Service {
    /**
     * 问题状态统计
     * @param projectId
     * @returns {Promise.<*>}
     */
    async listQuestionStatusCountByProjectId(projectId) {
        const sql = `select count(1) as num,question_status from ${DB_NAME} where project_id = ? group by question_status`;
        const projectMembers = await this.app.mysql.query(sql, [projectId]);
        return projectMembers;
    }

    /**
     * 问题趋势-最近一个月
     * @param projectId
     * @returns {Promise.<*>}
     */
    async listNewTrendOfQuestion(projectId) {
        const sql = `select count(1) as num,DATE_FORMAT(create_at,'%M-%D') 
                     as date from ${DB_NAME} where project_id = ? and 
                     TIMESTAMPDIFF(day,DATE_FORMAT(create_at,'%Y-%m-%d'), DATE_FORMAT(NOW(),'%Y-%m-%d')) < 30
                     group by DATE_FORMAT(create_at,'%M-%D')
                    `;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;

    }

    /**
     * 问题类型趋势-最近一个月
     * @param projectId
     * @returns {Promise.<*>}
     */
    async listNewTrendOfQuestionStatus(projectId) {
        const sql = `select count(1) as num,DATE_FORMAT(create_at,'%M-%D') 
                     as date,question_status from ${DB_NAME} where id = ? and 
                     TIMESTAMPDIFF(day,DATE_FORMAT(create_At,'%Y-%m-%d'), DATE_FORMAT(NOW(),'%Y-%m-%d')) < 30
                      group by question_status`;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;

    }

    /**
     * 人员及问题分布
     * @param projectId
     * @returns {Promise.<void>}
     */
    async listMemberAndQuestionDistribution(projectId) {
        const sql = `select 
        bg_project_question.question_status as question_status,
        bg_project_question.pointer_user_id as pointer_user_id,
         count(*) as num,
         bg_user.name as user_name 
         from bg_project_question
          left join bg_user
           on bg_user.id = bg_project_question.pointer_user_id 
           where bg_project_question.project_id = ?
           group by bg_project_question.pointer_user_id,bg_project_question.question_status`;
        const list = await this.app.mysql.query(sql, [projectId]);

        return list;
    }

    /**
     * 人员工作进度
     * @param projectId
     * @returns {Promise.<void>}
     */
    async listMemberWorkSchedule(projectId) {
        const sql = `select 
        bg_project_question.question_category,
        bg_project_question.pointer_user_id as pointer_user_id,
         count(*) as num,
         bg_user.name as user_name 
         from bg_project_question
          left join bg_user
           on bg_user.id = bg_project_question.pointer_user_id 
           where bg_project_question.project_id = ?
           group by bg_project_question.pointer_user_id,bg_project_question.question_category`;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;
    }


    /**
     * 优先级
     * @param projectId
     * @returns {Promise.<void>}
     */
    async listQuestionPriorityCount(projectId) {
        const sql = `select count(*) as num,question_priority from bg_project_question where project_id = ?`;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;
    }

    /**
     * 项目进度
     * @param projectId
     * @returns {Promise.<*>}
     */
    async listWorkScheduleCount(projectId) {
        const sql = `select count(*) as num,question_category from bg_project_question where project_id = ?`;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;
    }

    /**
     * 人员问题占比
     * @param projectId
     * @returns {Promise.<void>}
     */
    async listMemberQuestionRadio(projectId) {
        const sql = `select count(*) as num,
        bg_user.name from bg_project_question
         left join bg_user
          on bg_project_question.pointer_user_id = bg_user.name 
          where  bg_project_question.project_id = ? group by bg_project_question.pointer_user_id
        `;
        const list = await this.app.mysql.query(sql, [projectId]);
        return list;
    }


}

module.exports = Sta;