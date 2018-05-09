const sql = {
    valueToArray(whereInfo) {
        let values = [];
        whereInfo.forEach(item => {
            let value = item.value;
            if (value) {
                if (Array.isArray(value)) {
                    values = values.concat(value);
                } else {
                    values.push(value);
                }
            }
        });
        return  values;
    },
    generatorWhereSql(whereInfo, tableName) {
        const sqls = [];
        if (whereInfo) {
            whereInfo.forEach(item => {
                let type = item.type || '=';
                let key = tableName ? `${tableName}.${item.key}` : item.key;
                let value = item.value;
                if (value) {
                    if (whereSqlTypeReg.test(type)) {
                        sqls.push(`${key} ${type} ? and`)
                    } else if (whereSqlLikeTypeReg.test(type)) {
                        sqls.push(`${key} ${type} ? and`);
                    } else if (whereSqlInTypeReg.test(type)) {
                        if (Array.isArray(value)) {
                            sqls.push(`${key} ${type} ${this.getInDateString(value.length)} and`)
                        }
                    }else if (whereSqlDateRange.test(type)) {
                        if (Array.isArray(value) && value.length === 2 && value[0] && value[1]) {
                            sqls.push(`DATE_FORMAT(${key},'%Y-%m-%d') >= ? and DATE_FORMAT(${key},'%Y-%m-%d') <= ? and`)
                        }
                    }
                }
            });
            if (sqls.length > 0) {
                let lastIndex = sqls.length - 1;
                sqls[lastIndex] = sqls[lastIndex].substring(0, sqls[lastIndex].lastIndexOf('and'));
                sqls.unshift('where ');
            }
        }
        return sqls.join(' ');
    },
    /**
     * [2,3,1] => (?,?,?,?)
     * @param array
     */
    getInDateString(num = 0) {
        let str = '(';
        for (let i = 0; i < num; i++) {
            str += '?,';
        }
        str += ')';
        return str.replace(/,(?=\))/, '');
    }
};
const whereSqlTypeReg = /^(<|>|>=|<=|=)$/;
const whereSqlLikeTypeReg = /^like$/;
const whereSqlInTypeReg = /^in$/i;
const whereSqlDateRange = /^daterange$/;


module.exports = sql;
//
// const WhereProperty = require('../model/where_property');
// let whereInfo = [
//     new WhereProperty('question_status', [1,2,3]),
//     new WhereProperty('question_priority', [1,2,3]),
//     new WhereProperty('create_user_id', [1,2]),
//     new WhereProperty('question_category', 1),
//     new WhereProperty('pointer_user_id', 1),
//     new WhereProperty('create_at', 1),
//     new WhereProperty('update_at', 1),
//     new WhereProperty('search', '你啊后', 'like')];
// console.info(sql.generatorWhereSql(whereInfo));
