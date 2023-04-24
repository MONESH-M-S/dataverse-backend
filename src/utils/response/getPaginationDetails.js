const paginationConfig = require("../../config/pagination.config");

module.exports = (req) => {
    const { defaultPageSize, pageQueryParam, pageSizeQueryParam, fetchAllQueryParam } =
        paginationConfig;

    let limit, offset;
    if (req.query['limit'] === undefined) {
        limit = 10
    } else {
        limit = parseInt(req.query['limit'])
    }


    if (req.query['offset'] === undefined) {
        offset = 0
    } else {
        offset = parseInt(req.query['offset'])
    }


    // const limit = req.query['limit']
    let page = (offset / limit) + 1
    const pageSize = limit ?? defaultPageSize

    return {
        limit, offset, page, pageSize
    }
}