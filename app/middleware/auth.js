/**
 * 统一登录认证
 */

const ResponseStatus = require('../model/response_status');
module.exports = options => {
    return async function verify(ctx, next) {
        let noAuthUrls = options.noAuthUrl || [];
        if (filterNoAuthUrls(noAuthUrls, ctx.request.url)) {
            await next();
        } else {
            const user = ctx.session.user;
            if (user) {
                await next();
            } else {
                noAuth(ctx);
            }
        }
    }
};

function filterNoAuthUrls(noAuths, url) {
    url = url.split('?')[0];
    return noAuths.some(auth => {
        console.info([auth,url]);
        if (auth === url) {
            return true;
        }
    });
}

function noAuth(ctx) {
    ctx.body = {
        code: ResponseStatus.AUTH_ERROR,
        data: '登录失效'
    };
}



