const CommonEnum = require('./common_enum');
const question_priority = {
    H: new CommonEnum('高', 2),
    N: new CommonEnum('中', 1),
    L: new CommonEnum('低', 0),
    __ENUMS: [this.H, this.N, this.L],
    isExist: (state) => {
        return question_priority.all().some(e => {
            return e.state == state;
        });
    },
    all: () => {
        return [question_priority.H, question_priority.N, question_priority.L];
    },
    getEnums: state => {
        let qc = null;
        question_priority.all().forEach(e => {
            if (e.state == state) {
                qc = e;
            }
        });
        return qc;
    }
};

module.exports = question_priority;