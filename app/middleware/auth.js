/**
 * 统一登录认证
 */
module.exports = options => {
    return async function verify(ctx, next) {
        console.log(options);
        let noAuthUrls = options.noAuthUrl || [];
        console.info(noAuth(noAuthUrls,ctx.request.url));
        await next();
    }
};

function noAuth(noAuths, url) {
    return noAuths.some(auth => {
        if (auth === url) {
            return true;
        }
    });
}