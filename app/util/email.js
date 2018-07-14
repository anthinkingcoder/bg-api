const nodemailer = require('nodemailer');

const emailTransport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: false, // true for 465, false for other ports
    auth: {
        user: '837769723@qq.com',
        pass: 'cuinhhbjovgbbegi'
    }
});
const email = {
    sendEmail: function (options) {
        return new Promise((resolve, reject) => {
            emailTransport.sendMail(options, function (err, msg) {
                if (err) {
                    console.info(msg);
                    reject({isSuccess:false,msg:'发送失败'});
                } else {
                    resolve({isSuccess:true});
                }
            })
        })
    }
};
module.exports = email;