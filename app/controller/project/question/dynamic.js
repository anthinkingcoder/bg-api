'use strict';
const BaseController = require('../../base');
const ResponseStatus = require('../../../model/response_status');


class DynamicController extends BaseController {
    async listQuestionDynamicByProjectId() {
        const ctx = this.ctx;
        const query = ctx.query;
        const projectService = ctx.service.project;
        const dynamicService = ctx.service.project.question.dynamic;
        const projectId = query.project_id;
        const project = await projectService.findById(projectId);
        if (project) {
            const list = await dynamicService.listQuestionDynamicByProjectId(projectId);
            this.success(list);
        } else {
            this.error(ResponseStatus.NOT_FOUND, '项目不存在');
        }
    }
}

module.exports = DynamicController;