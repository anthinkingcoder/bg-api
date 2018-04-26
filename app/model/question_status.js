const CommonEnum = require('./common_enum');
const question_status = {
    NEW: new CommonEnum('新建', 0,'#45be95'),
    HANDLER: new CommonEnum('处理中', 1,'#ffbc00'),
    RESOLVED: new CommonEnum('已解决', 2,'#5bc0de'),
    IGNORE: new CommonEnum('已忽略', 3,'#a2d148'),
    PENDING: new CommonEnum('待反馈', 4,'#f1494e'),
    CLOSE: new CommonEnum('已关闭', 5,'#bedad3'),
    RE_OPEN: new CommonEnum('重新打开', 6,'#8b7cc5'),

    isExist: (state) => {
        return this.__ENUMS.some(e => {
            return e.state === state;
        });
    },
    all: () => {
        return [ question_status.NEW,question_status.HANDLER, question_status.RESOLVED, question_status.IGNORE, question_status.PENDING, question_status.CLOSE, question_status.RE_OPEN];
    },
    getEnums: state => {
        let qc = null;
        question_status.all().forEach(e => {
            if (e.state === state) {
                qc = e;
            }
        });
        return qc;
    }
};

module.exports = question_status;