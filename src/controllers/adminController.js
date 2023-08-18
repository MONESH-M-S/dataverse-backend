const SmlPcatModel = require("../models/smlPcat.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");

const fetchSmlPcatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { category, market, segment, filters, sorting } = req.query;

    let whereClause = {};
    let orderClause = [];

    if (category) whereClause["DP_CATEGORY"] = category;
    if (market) whereClause["DP_MARKET"] = market;
    if (segment) whereClause["DP_SEGMENT"] = segment;

    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        whereClause[filter.id] = { [Op.like]: `%${filter.value.trim()}%` };
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [[sortFilters[0].id, sortFilters[0].desc ? "DESC" : "ASC"]];
    }

    const smlPcatlist = await SmlPcatModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      result: smlPcatlist,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchSmlPcatRecordsPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);
    const { category, market, segment, filters, sorting } = req.query;

    let whereClause = {};
    let orderClause = [];

    if (category) whereClause["DP_CATEGORY"] = category;
    if (market) whereClause["DP_MARKET"] = market;
    if (segment) whereClause["DP_SEGMENT"] = segment;

    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        whereClause[filter.id] = { [Op.like]: `%${filter.value.trim()}%` };
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "SML_ID", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    const smlPcatCount = await SmlPcatModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: smlPcatCount,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const updateSmlPcatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const data = req.body.records;

    if (data.length) {
      for (const record of data) {
        const { SML_ID, ...rest } = record;

        await SmlPcatModel.update(rest, {
          where: {
            SML_ID,
          },
          returning: true,
        });
      }
    }

    const smlPcatlist = await SmlPcatModel.findAll({
      limit,
      offset,
    });

    res.json({
      status: statusTypeEnum.success,
      message: "Your entry has been updated.",
      result: smlPcatlist,
    });
  } catch (error) {
    next(error);
  }
};

const createSmlPcatRecord = async (req, res, next) => {
  try {
    const { record } = req.body;
    const createdRecord = await SmlPcatModel.create(record);
    res.json({
      status: statusTypeEnum.success,
      message: "Entry for New Metadata was successful. Team has been notified.",
      result: createdRecord,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSmlPcatRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await SmlPcatModel.destroy({
      where: {
        SML_ID: ids,
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

module.exports = {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
  createSmlPcatRecord,
  deleteSmlPcatRecords,
};
