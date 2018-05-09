const CommonEnum = require('./common_enum');
const question_category = {
    FUNCTION: new CommonEnum('功能', 0),
    TASK: new CommonEnum('任务', 1),
    BUG: new CommonEnum('bug', 2),
    isExist: state => {
        return question_category.all().some(e => {
            return e.state == state;
        });
    },
    all: () => {
        return [question_category.FUNCTION, question_category.TASK, question_category.BUG];
    },
    getEnums: state => {
        let qc = null;
        question_category.all().forEach(e => {
            if (e.state == state) {
                qc = e;
            }
        });
        return qc;
    }
};

module.exports = question_category;