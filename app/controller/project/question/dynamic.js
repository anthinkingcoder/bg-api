'use strict';
const BaseController = require('../../base');
const ResponseStatus = require('../../../model/response_status');
const Moment = require('moment');

class DynamicController extends BaseController {
    async listQuestionDynamicByQuestionId() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const questionService = ctx.service.project.question.question;
            const dynamicService = ctx.service.project.question.dynamic;
            const questionId = query.question_id;
            const question = await questionService.findById(questionId);
            if (question) {
                const list = await dynamicService.listQuestionDynamicByQuestionId(questionId);
                list.forEach(item => {
                    console.info([item.create_at,Moment(item.create_at).fromNow()])
                })
                this.success(list);
            } else {
                this.error(ResponseStatus.NOT_FOUND, '问题不存在');
            }
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }
    }

    async createComment() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const questionService = ctx.service.project.question.question;
            const dynamicService = ctx.service.project.question.dynamic;
            const questionId = body.question_id;
            const comment_content = body.comment_content;
            if (!comment_content) {
                this.error(ResponseStatus.ARGUMENT_ERROR, '评论内容不能为空');
                return;
            }
            const question = await questionService.findById(questionId);
            if (question) {
                const result = await dynamicService.create({
                    is_comment: 1,
                    question_id: questionId,
                    comment_content: body.comment_content,
                    create_user_id: this.user().id,
                    update_field: 'comment'
                });
                if (result) {
                    this.success();
                } else {
                    throw new Error('');
                }
            } else {
                this.error(ResponseStatus.NOT_FOUND, '问题不存在');
            }
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }
    }
}

module.exports = DynamicController;