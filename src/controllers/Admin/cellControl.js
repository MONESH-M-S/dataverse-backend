const CellControlModel = require("../../models/Admin/sourceDetails.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");
const { Op } = require("sequelize");

const fetchCellControlRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { filters, sorting, activated, deactivated } = req.query;

    let whereClause = {};
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
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (activated === "true" && deactivated === "true")
      whereClause[Op.or] = [{ IsActive: 1 }, { IsActive: 0 }];
    else if (activated === "true") whereClause["IsActive"] = 1;
    else if (deactivated === "true") whereClause["IsActive"] = 0;

    const cellControlList = await CellControlModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      result: cellControlList,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchCellControlRecordsPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);

    const { filters, sorting, activated, deactivated } = req.query;

    let whereClause = {};
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
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (activated === "true" && deactivated === "true")
      whereClause[Op.or] = [{ IsActive: 1 }, { IsActive: 0 }];
    else if (activated === "true") whereClause["IsActive"] = 1;
    else if (deactivated === "true") whereClause["IsActive"] = 0;

    const cellControlCount = await CellControlModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: cellControlCount,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchCellControlStatus = async (req, res, next) => {
  try {
    const { filters, sorting } = req.query;

    let whereClause = {};
    let tableFilters = [];

    if (filters && sorting) tableFilters = JSON.parse(filters);

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value)
          whereClause[filter.id] = { [Op.like]: `%${filter.value.trim()}%` };
      });
    }

    const total_cells = await CellControlModel.count({ where: whereClause });

    const activated_cells = await CellControlModel.count({
      where: { ...whereClause, IsActive: 1 },
    });

    const deactivated_cells = await CellControlModel.count({
      where: { ...whereClause, IsActive: 0 },
    });

    res.json({
      total_cells,
      activated_cells,
      deactivated_cells,
    });
  } catch (error) {
    next(error);
  }
};

const updateCellControlRecords = async (req, res, next) => {
  try {
    const { status, ids } = req.body;
    await CellControlModel.update(
      { IsActive: status },
      {
        where: {
          Id: ids,
        },
        returning: true,
      }
    );

    res.json({
      status: statusTypeEnum.success,
      message: `Cell${ids.length > 1 ? "s" : ""} ${
        status ? "activated" : "deactivated"
      }`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchCellControlRecords,
  fetchCellControlRecordsPagination,
  updateCellControlRecords,
  fetchCellControlStatus,
};
