'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');
const DynamicCategory = require('../../model/project_dynamic_category');

class ModelController extends BaseController {
    async create() {
        try {
            const ctx = this.ctx;
            const modelService = ctx.service.project.model;
            const projectService = ctx.service.project.project;
            const body = ctx.request.body;
            const modelName = body.model_name;
            const projectId = body.project_id;
            const project = await projectService.findById(projectId);
            if (project) {
                const result = await modelService.create({
                    model_name: modelName,
                    project_id: projectId
                });
                if (result) {
                    this.success('创建成功');
                }
            }
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async update() {
        try {
            const ctx = this.ctx;
            const modelService = ctx.service.project.model;
            const body = ctx.request.body;
            const modelName = body.model_name;
            const id = body.id;
            const result = await modelService.update({
                id: id,
                model_name: modelName,
                update_at: new Date()
            });
            if (result) {
                this.success('更新成功');
            } else {
                this.error(ReponseStatus.DB_ERROR, '更新失败');
            }
        } catch (e) {
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async listAll() {
        try {
            const ctx = this.ctx;
            const modelService = ctx.service.project.model;
            const projectService = ctx.service.project.project;
            const query = ctx.query;
            const projectId = query.project_id;
            const project = await projectService.findById(projectId);
            if (project) {
                const list = await modelService.listAll({
                    project_id: projectId
                });
                this.success(list);
            }
        } catch (e) {
            console.info(e);
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async delete() {

    }

}

module.exports = ModelController;