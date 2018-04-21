class StringBuffer {
    constructor(str) {
        this.__stringArray = [];
        if (str) {
            this.append(str);
        }
    }

    append(str) {
        this.__stringArray.push(str);
        return this;
    }

    toString() {
        return this.__stringArray.join("");
    }
}