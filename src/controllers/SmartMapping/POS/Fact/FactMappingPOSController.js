const FactMappingPOSModel = require("../../../../models/SmartMapping/POS/Fact/FactDetailPOS.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const factMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/POS/Fact/posFactMappedColumns");
const {Op} = require('sequelize')
const fetchMarketPOSMapping = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);

    const { Filename, Search, filters, sorting } = req.query;

    const whereClause = {
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
      whereClause[Op.or] = [
        { MarketLong: { [Op.like]: `%${Search.trim()}%` } },
        { UniqueTag: { [Op.like]: `%${Search.trim()}%` } },
      ];
    }

    const result = await FactMappingPOSModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};
const fetchMarketPOSMappingPagination = async (req, res, next) => {
  try {
    const { page, pageSize, limit, offset } = getPaginationDetails(req);

    const { Filename, Search, filters, sorting } = req.query;

    const whereClause = {
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
      whereClause[Op.or] = [
        { MarketLong: { [Op.like]: `%${Search.trim()}%` } },
        { UniqueTag: { [Op.like]: `%${Search.trim()}%` } },
      ];
    }

    const count = await FactMappingPOSModel.count({
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

const downloadPosMarketMapping = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const whereClause = {
      Filename: Filename,
    };

    const table = {};

    table.model = FactMappingPOSModel;
    table.columns = factMappedColumns;
    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMarketPOSMapping,
  fetchMarketPOSMappingPagination,
  downloadPosMarketMapping,
};
