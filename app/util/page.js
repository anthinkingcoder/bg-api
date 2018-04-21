const page = {
    getPageInfo(page = 0, size = 10) {
        const limit = (page - 1) * size;
        const offset = size;
        return {
            limit: limit,
            offset: offset
        }
    }
};

module.exports = page;