const dates = {
    ONE_DAY_MILLISECONDS: 24 * 60 * 60 * 1000,
    /**
     * @param day
     * @return array
     */
    getLastestDays: (day = 1) => {
        let days = [];
        if (!isNaN(day)) {
            let now = Date.now();
            let i = day;
            do {
                days.push(dates.parseDate(new Date(now), 'mm-dd'));
                now -= dates.ONE_DAY_MILLISECONDS;
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
    parseDate: (date = new Date(), dateFormat = 'yyyy-mm-dd hh:mm:ss') => {
        dateFormat = dateFormat.toLowerCase();
        if (/yyyy/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/yyyy/, date.getFullYear());
        }

        if (/mm/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/mm/, dates.supplementZero(date.getMonth() + 1));
        }
        if (/dd/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/dd/, dates.supplementZero(date.getUTCDate()));
        }

        if (/hh/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/hh/, dates.supplementZero(date.getHours()));
        }

        if (/mm/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/mm/, dates.supplementZero(date.getMinutes()));
        }

        if (/ss/.test(dateFormat)) {
            dateFormat = dateFormat.replace(/ss/, dates.supplementZero(date.getSeconds()));
        }
        return dateFormat;
    },
    supplementZero: (s) => {
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
module.exports = dates;