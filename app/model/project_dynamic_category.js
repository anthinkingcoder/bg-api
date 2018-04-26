const CommonEnum = require('./common_enum');
const dynamic = {
    E_PROJECT: new CommonEnum('退出了项目', 1),
    J_PROJECT: new CommonEnum('加入了项目', 2),
    C_PROJECT: new CommonEnum('创建了项目', 3)

};
module.exports = dynamic;