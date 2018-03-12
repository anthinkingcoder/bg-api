'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class BaseController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async user() {
    }

    async render(name) {
        this.ctx.body = await this.readFile(path.join(__dirname, '..', `/static/${name}`));
    }

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, bytes) => {
                if (!error) {
                    resolve(bytes.toString())
                }
                reject();
            });
        })
    }

    async error(code, message) {
        this.ctx.body = {
            code: code,
            message: message
        }
    }

    async success(data) {
        this.ctx.body = {
            code: '00000',
            data: data
        }
    }


}

module.exports = BaseController;