const paginationConfig = require("../../config/pagination.config");

module.exports = (req) => {
    const { defaultPageSize, pageQueryParam, pageSizeQueryParam, fetchAllQueryParam } =
        paginationConfig;

    // const page =
    //     req.query[pageQueryParam] > 0 ? parseInt(req.query[pageQueryParam]) : 1;

    // let pageSize =
    //     req.query[pageSizeQueryParam] > 0
    //         ? parseInt(req.query[pageSizeQueryParam])
    //         : defaultPageSize;

    // let limit = pageSize

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
    const pageSize = 10

    return {
        limit, offset, page, pageSize
    }
}