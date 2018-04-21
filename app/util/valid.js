const valid = {
    validTel (tel) {
        const reg = /^1[3548][0-9]{9}$/;
        return reg.test(tel);
    },
    validEmail (email) {
        const reg = /^\w+@\w+?\.\w+$/;
        return reg.test(email);
    }
};

module.exports = valid;