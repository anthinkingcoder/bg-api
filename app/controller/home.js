'use strict';

const BaseController = require('./base');

class HomeController extends BaseController {
    async index() {
        await this.render('index.html');
    }


    async json() {
        this.success('json例子');
    }

    async authCallback() {

    }

    async login() {
        this.success('json例子');
    }
}

module.exports = HomeController;
