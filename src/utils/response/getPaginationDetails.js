const paginationConfig = require("../../config/pagination.config");

module.exports = (req) => {
    const { defaultPageSize, pageQueryParam, pageSizeQueryParam, fetchAllQueryParam } =
        paginationConfig;

    const page =
        req.query[pageQueryParam] > 0 ? parseInt(req.query[pageQueryParam]) : 1;

    let pageSize =
        req.query[pageSizeQueryParam] > 0
            ? parseInt(req.query[pageSizeQueryParam])
            : defaultPageSize;

    let limit = pageSize

    if (req.query[fetchAllQueryParam] !== undefined) {
        pageSize = 0
        limit = null
    }

    const offset = pageSize * (page - 1)

    return {
        limit, offset, page, pageSize
    }
}