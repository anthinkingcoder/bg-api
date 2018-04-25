const valid = {
    validTel (tel) {
        const reg = /^1[3548][0-9]{9}$/;
        return reg.test(tel);
    },
    validEmail (email) {
        const reg = /^\w+@\w+?\.\w+$/;
        return reg.test(email);
    },
    validPassword(password) {
        const reg = /^[a-zA-Z][a-zA-Z0-9]{7,11}$/;
        return reg.test(password);
    }
};

module.exports = valid;