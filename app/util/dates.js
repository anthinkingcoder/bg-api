const moment = require('moment');
const dates = {
    ONE_DAY_MILLISECONDS: 24 * 60 * 60 * 1000,
    /**
     * @param day
     * @return array
     */
    getLastestDays(day = 1) {
        const days = [];
        if (!isNaN(day)) {
            let now = Date.now();
            let i = day;
            do {
                days.push(this.parseDate(new Date(now), 'mm-dd'));
                now -= this.ONE_DAY_MILLISECONDS;
                i--;
            } while (i > 0);
        }
        return days.reverse();
    },
    /**
     * 格式化时间 yyyy-mm-dd hh:mm:ss
     * @param date
     * @param dateFormat
     */
    parseDate(date = new Date(), dateFormat = 'yyyy-mm-dd hh:mm:ss') {
        dateFormat = dateFormat.toLowerCase();
        if (/yyyy/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/yyyy/, date.getFullYear());
        }

        if (/mm/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/mm/, this.supplementZero(date.getMonth() + 1));
        }
        if (/dd/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/dd/, this.supplementZero(date.getUTCDate()));
        }

        if (/hh/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/hh/, this.supplementZero(date.getHours()));
        }

        if (/mm/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/mm/, this.supplementZero(date.getMinutes()));
        }

        if (/ss/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/ss/, this.supplementZero(date.getSeconds()));
        }
        return dateFormat;
    },
    supplementZero(s) {
        s = String(s);
        if (s && s.length >= 2) {
            return s;
        }
        if (s && s.length === 1) {
            return 0 + s;
        }
        return s;
    }
};
module.export = dates;