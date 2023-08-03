const CellControlModel = require("../models/sourceDetails.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const statusTypeEnum = require("../enums/statusType.enum");
const { Op } = require("sequelize");

const fetchCellControlRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { provider, country, category, activated, deactivated } = req.query;
    const whereClause = {};
    if (provider) whereClause["DataProvider"] = provider;
    if (country) whereClause["Country"] = country;
    if (category) whereClause["Category"] = category;
    if (activated === "true" && deactivated === "true")
      whereClause[Op.or] = [{ IsActive: 1 }, { IsActive: 0 }];
    else if (activated === "true") whereClause["IsActive"] = 1;
    else if (deactivated === "true") whereClause["IsActive"] = 0;
    const cellControlList = await CellControlModel.findAll({
      limit,
      offset,
      where: whereClause,
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
    const { provider, country, category, activated, deactivated } = req.query;
    const whereClause = {};
    if (provider) whereClause["DataProvider"] = provider;
    if (country) whereClause["Country"] = country;
    if (category) whereClause["Category"] = category;
    if (activated === "true" && deactivated === "true")
      whereClause[Op.or] = [{ IsActive: 1 }, { IsActive: 0 }];
    else if (activated === "true") whereClause["IsActive"] = 1;
    else if (deactivated === "true") whereClause["IsActive"] = 0;
    const cellControlCount = await CellControlModel.count({
      limit,
      offset,
      where: whereClause,
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
    const total_cells = await CellControlModel.count();

    const activated_cells = await CellControlModel.count({
      where: {
        IsActive: 1,
      },
    });

    const deactivated_cells = await CellControlModel.count({
      where: {
        IsActive: 0,
      },
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
    const { limit, offset } = getPaginationDetails(req);
    const { status, ids } = req.body;
    const { provider, country, category, activated, deactivated } = req.query;
    const whereClause = {};
    if (provider) whereClause["DataProvider"] = provider;
    if (country) whereClause["Country"] = country;
    if (category) whereClause["Category"] = category;
    if (activated === "true" && deactivated === "true")
      whereClause[Op.or] = [{ IsActive: 1 }, { IsActive: 0 }];
    else if (activated === "true") whereClause["IsActive"] = 1;
    else if (deactivated === "true") whereClause["IsActive"] = 0;
    await CellControlModel.update(
      { IsActive: status },
      {
        where: {
          Id: ids,
        },
        returning: true,
      }
    );

    const cellControlList = await CellControlModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({
      status: statusTypeEnum.success,
      message: `Cell${ids.length > 1 ? "s" : ""} ${
        status ? "activated" : "deactivated"
      }`,
      result: cellControlList,
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
