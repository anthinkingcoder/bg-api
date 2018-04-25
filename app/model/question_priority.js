const CommonEnum = require('./common_enum');
const question_category = {
    H: new CommonEnum('高', 0),
    N: new CommonEnum('中', 1),
    L: new CommonEnum('低', 2),
    __ENUMS: [this.H, this.N, this.L],
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