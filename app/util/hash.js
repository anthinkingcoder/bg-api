const Crypto = require('crypto');


const Hash = {
    md5(data) {
        const Hash = Crypto.createHash('md5');
        return Hash.update(data)
            .digest('hex');
    },
    sha1(data) {
        const Hash = Crypto.createHash('SHA1');
        return Hash.update(data)
            .digest('hex');
    }
};

module.exports = Hash;