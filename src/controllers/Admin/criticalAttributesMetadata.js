const CriticalAttributesModel = require("../../models/Admin/criticalAttributes.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");
const { Sequelize } = require("../../../models");
const { Op } = require("sequelize");

const criticalAttributesRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);

    const { filters, sorting } = req.query;

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
        [
          sortFilters[0].id ?? "Id",
          sortFilters[0].desc ? "DESC" : "ASC",
        ],
      ];
    }

    const criticalAttributesList = await CriticalAttributesModel.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      result: criticalAttributesList.rows, count: criticalAttributesList.count
    };

    res.json(responseObj);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const updateCriticalAttributesRecords = async (req, res, next) => {
  try {
    const data = req.body.records;

    if (data.length) {
      for (const record of data) {
        const { Id, ...rest } = record;

        await CriticalAttributesModel.update(rest, {
          where: {
            Id,
          },
          returning: true,
        });
      }
    }

    res.json({
      status: statusTypeEnum.success,
      message: "Your entry has been updated.",
    });
  } catch (error) {
    next(error);
  }
};

const createCriticalAttributesRecords = async (req, res, next) => {
  try {
    const { records } = req.body;
    const createdRecords = await CriticalAttributesModel.bulkCreate(records);
    res.json({
      status: statusTypeEnum.success,
      message: `Entr${
        records.length > 1 ? "ies" : "y"
      } for New Metadata was successful. Team has been notified.`,
      result: createdRecords,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCriticalAttributesRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await CriticalAttributesModel.destroy({
      where: {
        Id: ids,
      },
    });
    res.json({
      status: statusTypeEnum.success,
      message: "Delete submission successful",
      result: deletedRecords,
    });
  } catch (error) {
    next(error);
  }
};

const fetchGlobalDbMeta = async (req, res, next) => {
  try {
    const { localDB, marketName } = req.query;
    const whereClause = {};

    if (localDB) whereClause["Local Database Name"] = localDB;
    if (marketName) whereClause["MarketNameCode"] = marketName;

    const list = await CriticalAttributesModel.findAll({
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("Global Database Name")),
          "name",
        ],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

const fetchLocalDbMeta = async (req, res, next) => {
  try {
    const { globalDB, marketName } = req.query;
    const whereClause = {};

    if (globalDB) whereClause["Global Database Name"] = globalDB;
    if (marketName) whereClause["MarketNameCode"] = marketName;

    const list = await CriticalAttributesModel.findAll({
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("Local Database Name")),
          "name",
        ],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

const fetchMarketNameCodeMeta = async (req, res, next) => {
  try {
    const { globalDB, localDB } = req.query;

    const whereClause = {};

    if (globalDB) whereClause["Global Database Name"] = globalDB;
    if (localDB) whereClause["Local Database Name"] = localDB;

    const list = await CriticalAttributesModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("MarketNameCode")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criticalAttributesRecords,
  updateCriticalAttributesRecords,
  createCriticalAttributesRecords,
  deleteCriticalAttributesRecords,
  fetchGlobalDbMeta,
  fetchLocalDbMeta,
  fetchMarketNameCodeMeta,
};
