'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class BaseController extends Controller {

    constructor(ctx) {
        super(ctx);
    }

    user() {
        return this.ctx.session.user;
    }

    async render(name) {
        this.ctx.body = await this.readFile(path.join(__dirname, '..', `/static/${name}`));
    }


    error(code, message) {
        this.ctx.body = {
            code: code,
            message: message
        }
    }

    success(data) {
        this.ctx.body = {
            code: '00000',
            data: data
        }
    }

    readFile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (error, bytes) => {
                if (!error) {
                    resolve(bytes.toString())
                } else {
                    reject();
                }
            });
        })
    }


    objectNotNull(object, filterArgs) {
        let keys = Object.keys(object).filter(key => {
            let flag = true;
            if (filterArgs) {
                filterArgs.forEach(item => {
                    if (key === item) {
                        flag = false;
                        return true;
                    }
                })
            }
            return flag;
        });

        let success = true;
        keys.forEach(function (key) {
            if (!object[key]) {
                success = false;
                return true;
            }
        });
        return success;
    }


}

module.exports = BaseController;