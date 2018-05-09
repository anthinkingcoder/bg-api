'use strict';
const BaseController = require('../../base');
const ResponseStatus = require('../../../model/response_status');
const QuestionPriority = require('../../../model/question_priority');
const QuestionCategory = require('../../../model/question_category');
const WhereProperty = require('../../../model/where_property');
const QuestionStatus = require('../../../model/question_status');
const Dates = require('../../../util/dates');

class QuestionController extends BaseController {
    async create() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const questionService = ctx.service.project.question.question;
            const projectService = ctx.service.project.project;
            const userService = ctx.service.user.user;
            const project = await projectService.findById(body.project_id);
            const user = this.user();
            if (project) {
                const question_priority = body.question_priority;
                const question_name = body.question_name;
                const create_user_id = user.id;
                const pointer_id = body.pointer_user_id;
                const question_category = body.question_category;
                const question_summary = body.question_summary;
                let finished_at = body.finished_at;
                const project_id = body.project_id;
                let model_id = body.model_id;

                if (!question_name) {
                    this.error(ResponseStatus.ARGUMENT_ERROR, '问题名称不能为空');
                    return;
                }
                if (!QuestionCategory.isExist(question_category)) {
                    this.error(ResponseStatus.ARGUMENT_ERROR, '问题类型不存在');
                    return;
                }
                if (!QuestionPriority.isExist(question_priority)) {
                    this.error(ResponseStatus.ARGUMENT_ERROR, '项目优先级不存在');
                    return;
                }
                if (pointer_id) {
                    let result = userService.findByUid(pointer_id);
                    if (!result) {
                        this.error(ResponseStatus.NOT_FOUND, '指派人不存在');
                        return;
                    }
                }
                if (model_id) {

                }
                if (finished_at) {
                    finished_at = Dates.strToDate(finished_at);
                }


                const result = await questionService.create({
                    create_user_id: create_user_id,
                    pointer_user_id: pointer_id ? pointer_id : null,
                    question_summary: question_summary,
                    question_name: question_name,
                    question_priority: question_priority,
                    question_category: question_category,
                    finished_at: finished_at ? finished_at : null,
                    project_id: project_id,
                    model_id: model_id ? model_id : null
                });
                if (result) {
                    this.success('问题创建成功');
                } else {
                    this.error(ResponseStatus.DB_ERROR, '系统异常');
                }
            } else {
                this.error(ResponseStatus.NOT_FOUND, '项目不存在');
            }
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }

    }


    async list() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const questionService = ctx.service.project.question.question;
            const projectService = ctx.service.project.project;
            const project = await projectService.findById(body.project_id);
            if (project) {
                let search = body.search;
                let question_status = body.question_status;
                let question_priority = body.question_priority;
                let question_category = body.question_category;
                let create_user_id = body.create_user_id;
                let pointer_user_id = body.pointer_user_id;
                let create_at = body.create_at;
                let update_at = body.update_at;
                let finished_at = body.finished_at;
                let order = body.order ? body.order : {'key':'create_at', 'sort':'desc'} ;
                let whereInfo = [
                    new WhereProperty('project_id', project.id),
                    new WhereProperty('question_status', question_status),
                    new WhereProperty('question_priority', question_priority),
                    new WhereProperty('create_user_id', create_user_id),
                    new WhereProperty('question_category', question_category),
                    new WhereProperty('pointer_user_id', pointer_user_id),
                ];
                if (create_at && create_at.start_at && create_at.end_at) {
                    whereInfo.push(new WhereProperty('create_at', [create_at.start_at, create_at.end_at], 'daterange'));
                }

                if (update_at && update_at.start_at && update_at.end_at) {
                    whereInfo.push(new WhereProperty('update_at', [update_at.start_at, update_at.end_at], 'daterange'));
                }

                if (finished_at && finished_at.start_at && finished_at.end_at) {
                    whereInfo.push(new WhereProperty('finished_at', [finished_at.start_at, finished_at.end_at], 'daterange'));
                }
                if (search) {
                    whereInfo.push(new WhereProperty('question_name', `%${search}%`, 'like'),
                    )
                }

                let page = body.page || 1;
                let size = body.size || 10;
                const list = await questionService.list(whereInfo, page, size,order);

                //格式化时间
                list.forEach(item => {
                    item.create_at = Dates.toDate(item.create_at);
                    item.finished_at = Dates.toDate(item.finished_at);
                    item.update_at = Dates.toDate(item.update_at);
                });
                const count = await questionService.count(whereInfo);
                this.success({
                    list: list,
                    page: page,
                    size: size,
                    total: count[0].count
                });

            } else {
                this.error(ResponseStatus.NOT_FOUND, '项目不存在');
            }
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }

    }


    async listByProjectIdAndPointerId() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const questionService = ctx.service.project.question.question;
            const projectService = ctx.service.project.project;
            const project = await projectService.findById(query.project_id);
            if (project) {
                const list = await questionService.listByProjectIdAndPointerId(query.project_id, this.user().idx);
                this.success({
                    [QuestionStatus.NEW.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.NEW.state),
                        status: QuestionStatus.NEW.state
                    },
                    [QuestionStatus.HANDLER.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.HANDLER.state),
                        status: QuestionStatus.HANDLER.state
                    },
                    [QuestionStatus.RESOLVED.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.RESOLVED.state),
                        status: QuestionStatus.RESOLVED.state
                    },
                    [QuestionStatus.IGNORE.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.IGNORE.state),
                        status: QuestionStatus.IGNORE.state
                    },
                    [QuestionStatus.PENDING.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.PENDING.state),
                        status: QuestionStatus.PENDING.state
                    },
                    [QuestionStatus.CLOSE.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.CLOSE.state),
                        status: QuestionStatus.CLOSE.state
                    },
                    [QuestionStatus.RE_OPEN.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.RE_OPEN.state),
                        status: QuestionStatus.RE_OPEN.state
                    }
                })
            } else {
                this.error(ResponseStatus.NOT_FOUND, '项目不存在');
            }
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }
    }

    async listByProjectIdAndCreateUserId() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const questionService = ctx.service.project.question.question;
            const projectService = ctx.service.project.project;
            const project = await projectService.findById(query.project_id);
            if (project) {
                const list = await questionService.listByProjectIdAndCreateUserId(query.project_id, this.user().id);
                this.success({
                    [QuestionStatus.NEW.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.NEW.state),
                        status: QuestionStatus.NEW.state
                    },
                    [QuestionStatus.HANDLER.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.HANDLER.state),
                        status: QuestionStatus.HANDLER.state
                    },
                    [QuestionStatus.RESOLVED.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.RESOLVED.state),
                        status: QuestionStatus.RESOLVED.state
                    },
                    [QuestionStatus.IGNORE.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.IGNORE.state),
                        status: QuestionStatus.IGNORE.state
                    },
                    [QuestionStatus.PENDING.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.PENDING.state),
                        status: QuestionStatus.PENDING.state
                    },
                    [QuestionStatus.CLOSE.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.CLOSE.state),
                        status: QuestionStatus.CLOSE.state
                    },
                    [QuestionStatus.RE_OPEN.name]: {
                        list: list.filter(item => item.question_status === QuestionStatus.RE_OPEN.state),
                        status: QuestionStatus.RE_OPEN.state
                    }
                })
            } else {
                this.error(ResponseStatus.NOT_FOUND, '项目不存在');
            }
        } catch (e) {
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }
    }

    async findDetail() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const questionService = ctx.service.project.question.question;
            const question = await questionService.findDetailById(query.question_id);
            this.success(question[0]);
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }
    }

    async update() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const field = body.field;
            const value = body.value;
            const userId = this.user().id;
            const question_id = body.question_id;
            const questionService = ctx.service.project.question.question;
            const question = await questionService.findById(question_id);
            if (!question) {
                this.error(ResponseStatus.NOT_FOUND, '问题不存在');
            } else {
                const result = await questionService.update({
                    [field]: value ? value : null,
                    id: question_id
                }, userId, field);
                if (result) {
                    this.success('问题更新成功');
                } else {
                    this.error('问题更新失败');
                }
            }
        } catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR, '系统异常');
        }
    }
}

module.exports = QuestionController;