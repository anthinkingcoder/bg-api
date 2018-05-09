'use strict';
const BaseController = require('../base');
const ReponseStatus = require('../../model/response_status');

class WikiController extends BaseController {
    async create() {
        try {
            const ctx = this.ctx;
            const wikiService = ctx.service.project.wiki;
            const projectService = ctx.service.project.project;
            const body = ctx.request.body;
            const name = body.name;
            const content = body.content;
            const projectId = body.project_id;
            const project = await projectService.findById(projectId);
            const user = this.user();
            if (project) {
                const result = await wikiService.create({
                    name: name,
                    content: content,
                    create_user_id: user.id,
                    update_user_id: user.id,
                    project_id: projectId,
                    model_id: body.model_id ? body.model_id : null
                });
                if (result) {
                    this.success('创建成功');
                }
            }
        } catch (e) {
            console.info(e);
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async update() {
        try {
            const ctx = this.ctx;
            const body = ctx.request.body;
            const wikiService = ctx.service.project.wiki;
            const name = body.name;
            const content = body.content;
            const model_id = body.model_id;
            const id = body.id;
            const user =this.user();
            const result = await wikiService.update({
                name: name,
                content: content,
                id: id,
                model_id: model_id ? model_id : null,
                update_user_id: user.id,
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

    async findDetail() {
        try {
            const ctx = this.ctx;
            const wikiService = ctx.service.project.wiki;
            const query = ctx.query;
            const list = await wikiService.findDetail(query.id);
            this.success(list);
        }
        catch (e) {
            console.info(e);
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async listAll() {
        try {
            const ctx = this.ctx;
            const wikiService = ctx.service.project.wiki;
            const projectService = ctx.service.project.project;
            const query = ctx.query;
            const projectId = query.project_id;
            const project = await
                projectService.findById(projectId);
            if (project) {
                const list = await
                    wikiService.listWikiByProjectId(
                        projectId
                    );

                const newList = {};
                let newItem = [];
                let curModelName = -1;
                list.forEach(item => {
                    let modelName = item.model_name;
                    if (curModelName == -1) {
                        curModelName = modelName;
                    }
                    if (modelName == curModelName) {
                        newItem.push(item);
                    } else {
                        if (!curModelName) {
                            newList['公共模块'] = newItem.concat();
                        } else {
                            newList[curModelName] = newItem.concat();
                        }
                        curModelName = modelName;
                        newItem = [item];
                    }
                });
                if (curModelName != -1) {
                    if (!curModelName) {
                        newList['公共模块'] = newItem.concat();
                    } else {
                        newList[curModelName] = newItem.concat();
                    }
                }
                this.success(newList);
            }
        } catch (e) {
            console.info(e);
            this.error(ReponseStatus.DB_ERROR, '系统异常');
        }
    }

    async delete() {

    }

}

module.exports = WikiController;