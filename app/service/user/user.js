const Service = require('egg').Service;
const DB_NAME = 'bg_user';
const Hash = require('../../util/hash')

class UserService extends Service {
    async findByUid(uid) {
        const user = await this.app.mysql.get(DB_NAME, {id: uid});
        return user;
    }

    async findByEmail(email) {
        const user = await this.app.mysql.get(DB_NAME, {email: email});
        return user;
    }


    async create(user) {
        user = this.initUser(user);
        const result = await this.app.mysql.insert(DB_NAME, user);
        return result.affectedRows === 1;
    }

    async update(user) {
        const result = await this.app.mysql.update(DB_NAME, user);
        return result.affectedRows === 1;
    }

    initUser(user) {
        user.password = Hash.md5(user.password);
        user.salt = user.password;
        user.create_at = new Date();
        user.last_login_time = user.create_at;
        user.update_at = user.create_at;
        return user;
    }
}

module.exports = UserService;