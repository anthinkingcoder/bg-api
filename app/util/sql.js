const sql = {
    generatorWhereSql(whereInfo) {
        const sqls = [];
        if (whereInfo) {
            sqls.push(' where');
            whereInfo.forEach(item => {
                let type = item.type || '=';
                let key = item.key;
                if (whereSqlTypeReg.test(type)) {
                    sqls.push(`${key} ${type} ? and`)
                } else if (whereSqlLikeTypeReg.test(type)) {
                    sql.push(`${key} ${type} %?% and`);
                }
            });
            let lastIndex = sqls.length - 1;
            sqls[lastIndex] = sqls[lastIndex].substring(0, sqls[lastIndex].lastIndexOf('and'));
        }
        return sqls.join(' ');
    }
};
const whereSqlTypeReg = /^(<|>|>=|<=)$/;
const whereSqlLikeTypeReg = /^like$/;

module.exports = sql;


console.info(sql.generatorWhereSql({
    name: 'zhoulin'
}))