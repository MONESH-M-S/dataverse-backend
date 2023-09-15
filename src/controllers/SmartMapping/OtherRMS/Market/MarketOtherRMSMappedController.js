const MarketOtherRMSModel = require("../../../../models/SmartMapping/OtherRms/Market/MarketOtherRMS.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const { Op } = require("sequelize");
const MarketMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/OtherRMS/MarketMapped");

const fetchMarketOtherRMSMapping = async (req, res, next) => {
  try {
    const { Search, Filename, filters, sorting } = req.query;

    const { limit, offset } = getPaginationDetails(req);

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
            [Op.like]: `%${filter.value.trim()}%`,
          };
        else return;
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (Search) {
      whereClause[Op.or] = [
        {
          Filename: {
            [Op.like]: `%${Search.trim()}%`,
          },
        },
        {
          Category: {
            [Op.like]: `%${Search.trim()}%`,
          },
        },
        {
          Country: {
            [Op.like]: `%${Search.trim()}%`,
          },
        },
      ];
    }

    const result = await MarketOtherRMSModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    res.json({
      result: result,
    });
  } catch (error) {
    next(error);
  }
};

const fetchOtherRMSMarketMappedCount = async (req, res, next) => {
  try {
    const { Search, Filename, filters, sorting } = req.query;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

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
            [Op.like]: `%${filter.value.trim()}%`,
          };
        else return;
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (Search) {
      whereClause[Op.or] = [
        {
          Filename: {
            [Op.like]: `%${Search.trim()}%`,
          },
        },
        {
          Category: {
            [Op.like]: `%${Search.trim()}%`,
          },
        },
        {
          Country: {
            [Op.like]: `%${Search.trim()}%`,
          },
        },
      ];
    }

    const result = await MarketOtherRMSModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: result,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadOtherRMSMarketExcel = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const table = {};

    let whereClause = {
      Filename: Filename,
    };

    table.columns = MarketMappedColumns;
    table.model = MarketOtherRMSModel;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMarketOtherRMSMapping,
  fetchOtherRMSMarketMappedCount,
  downloadOtherRMSMarketExcel,
};
