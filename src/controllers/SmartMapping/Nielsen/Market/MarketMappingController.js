const MarketMappingModel = require("../../../../models/SmartMapping/Nielsen/Market/MarketDetail.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const marketMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/Nielsen/Market/marketMappedColumns");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const { Op } = require("sequelize");

const fetchMarketMapping = async (req, res, next) => {
  try {
    const {
      limit,
      offset
    } = getPaginationDetails(req);

    const {
      Filename,
      Search,
      filters,
      sorting
    } = req.query;

    let whereClause = {
      Filename: Filename,
    };
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value)
          whereClause[filter.id] = {
            [Op.like]: `%${filter.value.trim()}%`
          };
        else
          return
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (Search) {
      whereClause[Op.or] = [{
          Long: {
            [Op.like]: `%${Search}%`
          }
        },
        {
          Tag: {
            [Op.like]: `%${Search}%`
          }
        },
      ];
    }

    const result = await MarketMappingModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    res.json({
      result: result
    });
  } catch (error) {
    next(error);
  }
};
const fetchMarketMappingPagination = async (req, res, next) => {
  try {
    const {
      limit,
      offset,
      page,
      pageSize
    } = getPaginationDetails(req);

    const {
      Filename,
      Search,
      filters,
      sorting
    } = req.query;

    let whereClause = {
      Filename: Filename,
    };
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value)
          whereClause[filter.id] = {
            [Op.like]: `%${filter.value.trim()}%`
          };
        else
          return
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (Search) {
      whereClause[Op.or] = [{
          Long: {
            [Op.like]: `%${Search}%`
          }
        },
        {
          Tag: {
            [Op.like]: `%${Search}%`
          }
        },
      ];
    }

    const count = await MarketMappingModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadMarketMapping = async (req, res, next) => {
  try {
    const {
      Filename
    } = req.query;

    const table = {};

    const whereClause = {
      Filename: Filename,
    };

    table.model = MarketMappingModel;
    table.columns = marketMappedColumns;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMarketMapping,
  fetchMarketMappingPagination,
  downloadMarketMapping,
};