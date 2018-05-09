const page = {
    getPageInfo(page = 1, size = 10) {
        page = parseInt(page);
        size = parseInt(size);
        if (page < 1) {
            page = 1;
        }

        if (size < 0) {
            size = 10;
        }
        const limit = (page - 1) * size;
        const offset = size;
        return {
            limit: limit,
            offset: offset
        }
    }
};

module.exports = page;