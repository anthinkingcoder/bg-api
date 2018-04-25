class WhereProperty {
    constructor(key, value, type) {
        this.key = key;
        this.value = value;
        if (Array.isArray(value)) {
            this.type = 'in';
        } else {
            this.type = type;
        }
    }
}

module.exports = WhereProperty;