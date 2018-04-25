'use strict';

const path = require('path');
module.exports = appInfo => {
    const config  = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_yes';

    // add your config here
    config.middleware = ['auth', 'notFoundHandler'];
    config.auth = {
        noAuthUrl: ['/api/login', '/api/register','/api/valid/email','/api/valid/tel'] //不需要登录认证
    };
    config.nunjucks = {
        enable: true,
        package: 'egg-view-nunjucks',
    };
    config.view = {
        defaultViewEngine: 'nunjucks',
        defaultExtension: '.html'
    };

    //配置egg.static
    config.static = {
        prefix: '/static/',
        dir: path.join(appInfo.baseDir, 'app/static')
    }

    //配置mysql
    config.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: '837769723',
            // 数据库名
            database: 'bg',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };

    console.info('配置---------');

    return config;
};

