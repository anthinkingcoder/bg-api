'use strict';
const BaseController = require('../../base');
const ResponseStatus = require('../../../model/response_status');
const Dates = require('../../../util/dates');
const QuestionCategory = require('../../../model/question_category');
const QuestionStatus = require('../../../model/question_status');

class StaController extends BaseController {
    /**
     * 问题状态统计
     */
    async listQuestionStatusCountByProjectId() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = [];
            const staList = await staService.listQuestionStatusCountByProjectId(projectId);
            QuestionStatus.all().forEach(item => {
                let status;
                let exist = staList.some(e => {
                    if (item.state === e.question_status) {
                        status = e;
                        return true;
                    }
                    return false;
                });
                if (exist) {
                    list.push({name: item.name, num: status.num, status: item.question_status})
                } else {
                    list.push({name: item.name, num: 0, status: item.question_status, color: item.value})
                }
            });
            this.success(list);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    /**
     * 问题趋势-最近一个月
     */
    async listNewTrendOfQuestion() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listNewTrendOfQuestion(projectId);
            const dates = Dates.getLastestDays(30);
            const newList = [];
            dates.forEach(date => {
                let existItem;
                let exists = list.some(item => {
                    existItem = item;
                    return item.date === date;
                });
                if (exists) {
                    newList.push({date: date, num: existItem && existItem.num})
                } else {
                    newList.push({date: date, num: 0});
                }
            });
            this.success(newList);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    /**
     * 问题类型趋势-最近一个月
     */
    async listNewTrendOfQuestionCategory() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listNewTrendOfQuestionCategory(projectId);
            const dates = Dates.getLastestDays(30);
            const fncs = [];
            const tasks = [];
            const bugs = [];
            dates.forEach(date => {
                let existItem;
                //handle fncs
                let exists = list.some(item => {
                    existItem = item;
                    return item.question_category == QuestionCategory.FUNCTION.state && item.date == date;
                });
                if (exists) {
                    console.info(exists);
                    fncs.push({date: date, num: existItem && existItem.num})
                } else {
                    fncs.push({date: date, num: 0});
                }

                //handle tasks
                exists = list.some(item => {
                    existItem = item;
                    return item.question_category == QuestionCategory.TASK.state && item.date === date;
                });
                if (exists) {
                    tasks.push({date: date, num: existItem && existItem.num})
                } else {
                    tasks.push({date: date, num: 0});
                }

                //handle bugs
                exists = list.some(item => {
                    existItem = item;
                    return item.question_category == QuestionCategory.BUG.state && item.date === date;
                });
                if (exists) {
                    bugs.push({date: date, num: existItem && existItem.num})
                } else {
                    bugs.push({date: date, num: 0});
                }
            });
            this.success({
                fnc: fncs,
                tasks: tasks,
                bugs: bugs
            });
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    /**
     * 人员及问题分布
     */
    async listMemberAndQuestionDistribution() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listMemberAndQuestionDistribution(projectId);
            const newList = [];
            let newItem = [];
            let curPid = -1;
            list.forEach(item => {
                let pid = item.pointer_user_id;
                if (curPid == -1) {
                    curPid = pid;
                }
                if (pid == curPid) {
                    newItem.push(item);
                } else {
                    curPid = pid;
                    newList.push(newItem.concat());
                    newItem = [item];
                }
            });
            newList.push(newItem);
            this.success(newList);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    /**
     * 人员工作进度
     */
    async listMemberWorkSchedule() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listMemberWorkSchedule(projectId);
            const newList = [];
            let newItem = [];
            let curPid = -1;
            list.forEach(item => {
                let pid = item.pointer_user_id;
                if (curPid == -1) {
                    curPid = pid;
                }
                if (pid == curPid) {
                    newItem.push(item);
                } else {
                    curPid = pid;
                    newList.push(newItem.concat());
                    newItem = [item];
                }
            });
            newList.push(newItem);
            this.success(newList);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }


    /**
     * 优先级
     */
    async listQuestionPriorityCount() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listQuestionPriorityCount(projectId);
            this.success(list);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    /**
     * 项目进度
     */
    async listWorkScheduleCount() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listWorkScheduleCount(projectId);
            this.success({
                finished: list['finished'],
                unfinished: {
                    value: list.total - list['finished'].value
                }
            });
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    /**
     * 人员问题占比
     */
    async listMemberQuestionRadio() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listMemberQuestionRadio(projectId);
            this.success(list);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

    async listModel() {
        const ctx = this.ctx;
        const query = ctx.query;
        const staService = ctx.service.project.question.sta;
        const projectService = ctx.service.project.project;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await staService.listModel(projectId);
            this.success(list);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }

}

module.exports = StaController;