const FactMappingModel = require("../../../../models/SmartMapping/Nielsen/Fact/FactDetail.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const factMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/Nielsen/Fact/factMappedColumns");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const { Op } = require("sequelize");

const fetchFactMapping = async (req, res, next) => {
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
          whereClause[filter.id] = { [Op.like]: `%${filter.value.trim()}%` };
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
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + Search + "%",
      };
    }

    const result = await FactMappingModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    res.json({
      result: result
    });
  } catch (error) {
    next(error);
  }
};

const fetchFactMappingPagination = async (req, res, next) => {
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
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (Search) {
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + Search + "%",
      };
    }

    const count = await FactMappingModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
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

const downloadFactMapping = async (req, res, next) => {
  try {
    const {
      Filename
    } = req.query;

    const table = {};

    let whereClause = {
      Filename: Filename,
    };

    table.model = FactMappingModel;
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
  fetchFactMapping,
  fetchFactMappingPagination,
  downloadFactMapping,
};
