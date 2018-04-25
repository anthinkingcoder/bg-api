const CommonEnum = require('./common_enum');
const question_category = {
    NEW: new CommonEnum('新建', 0),
    HANDLER: new CommonEnum('处理中', 1),
    RESOLVED: new CommonEnum('已解决', 2),
    IGNORE: new CommonEnum('已忽略', 3),
    PENDING: new CommonEnum('待反馈', 4),
    CLOSE: new CommonEnum('已关闭', 5),
    RE_OPEN: new CommonEnum('重新打开', 6),
    __ENUMS: [this.HANDLER, this.NEW, this.RESOLVED, this.IGNORE, this.PENDING, this.CLOSE, this.RE_OPEN],
    isExist: (state) => {
        return this.__ENUMS.some(e => {
            return e.state === state;
        });
    },
    getEnums: state => {
        let qc = null;
        this.__ENUMS.forEach(e => {
            if (e.state === state) {
                qc = e;
            }
        });
        return qc;
    }
};

module.exports = question_category;