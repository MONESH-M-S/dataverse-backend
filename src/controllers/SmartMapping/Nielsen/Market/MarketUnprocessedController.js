const MaketUnprocessedModel = require("../../../../models/SmartMapping/Nielsen/Market/MarketUnprocessed.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const marketUnprocessedColumns = require("../../../../constants/Excel-Columns/SmartMapping/Nielsen/Market/marketUnprocessedColumns");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchMarketUnprocessed = async (req, res, next) => {
  try {
    const {
      Filename,
      filters,
      sorting
    } = req.query;

    const {
      limit,
      offset,
    } = getPaginationDetails(req);

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

    const result = await MaketUnprocessedModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    res.json({
      result
    });
  } catch (err) {
    next(err);
  }
};

const fetchMarketUnprocessedPagination = async (req, res, next) => {
  try {
    const {
      Filename,
      filters,
      sorting
    } = req.query;

    const {
      limit,
      offset,
      page,
      pageSize
    } = getPaginationDetails(req);

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

    const result = await MaketUnprocessedModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    res.json({
      page,
      page_size: pageSize,
      total_count: result
    });
  } catch (err) {
    next(err);
  }
};

const downloadMarketUnprocessed = async (req, res, next) => {
  try {
    const {
      Filename
    } = req.query;

    const table = {};

    const whereClause = {
      Filename: Filename,
    };

    table.model = MaketUnprocessedModel;
    table.columns = marketUnprocessedColumns;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMarketUnprocessed,
  fetchMarketUnprocessedPagination,
  downloadMarketUnprocessed,
};