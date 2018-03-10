'use strict';

const path = require('path');
module.exports = appInfo => {
    const config = exports = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_yes';

    // add your config here
    config.middleware = ['auth', 'notFoundHandler'];
    config.auth = {
        noAuthUrl: ['/login', '/register', '/index'] //不需要登录认证
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

    return config;
};

