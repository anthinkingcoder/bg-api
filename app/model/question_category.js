const CommonEnum = require('./common_enum');
const question_category = {
    FUNCTION: new CommonEnum('功能', 0),
    TASK: new CommonEnum('任务', 1),
    BUG: new CommonEnum('bug', 2),
    __ENUMS: [this.FUNCTION, this.TASK, this.BUG],
    isExist: state => {
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