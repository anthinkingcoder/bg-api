class WhereProperty {
    constructor(key, value, type) {
        this.key = key;
        this.value = value;
        if (Array.isArray(value) && type !== 'daterange') {
            this.type = 'in';
        } else {
            this.type = type;
        }
    }
}

module.exports = WhereProperty;