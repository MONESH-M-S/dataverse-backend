const defaultPageSize = 10;
const pageQueryParam = "limit";
const pageSizeQueryParam = "offset";
const fetchAllQueryParam = 'all'

const paginationConfig = {
    defaultPageSize,
    pageQueryParam,
    pageSizeQueryParam,
    fetchAllQueryParam
};

module.exports = paginationConfig;
