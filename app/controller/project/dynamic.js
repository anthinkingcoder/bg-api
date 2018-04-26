'use strict';
const BaseController = require('../base');
const ResponseStatus = require('../../model/response_status');


class DynamicController extends BaseController {
    async listProjectDynamic() {
        try {
            const ctx = this.ctx;
            const query = ctx.query;
            const projectService = ctx.service.project.project;
            const dynamicService = ctx.service.project.dynamic;
            const projectId = query.project_id;
            const page = query.page || 1;
            const size = query.size || 10;
            const project = await projectService.findById(projectId);
            if (project) {
                const list = await dynamicService.listProjectDynamic(projectId,page,size);
                this.success(list);
            } else {
                this.error(ResponseStatus.NOT_FOUND, '项目不存在');
            }
        }catch (e) {
            console.info(e);
            this.error(ResponseStatus.DB_ERROR,'系统异常');
        }
    }
}

module.exports = DynamicController;