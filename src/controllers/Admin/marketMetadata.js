const MarketMetadata = require("../../models/Admin/MarketMetadata.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");
const { Sequelize } = require("../../../models");
const { Op } = require("sequelize");

const fetchMarketMetadataRecords = async (req, res, next) => {
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
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    const marketMetadataList = await MarketMetadata.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = { result: marketMetadataList };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchMarketMetadataRecordsPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);

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
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    const marketCount = await MarketMetadata.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: marketCount,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const updateMarketMetadataRecords = async (req, res, next) => {
  try {
    const data = req.body.records;

    if (data.length) {
      for (const record of data) {
        const { Id, ...rest } = record;

        await MarketMetadata.update(rest, {
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

const createMarketMetadataRecords = async (req, res, next) => {
  try {
    const { records } = req.body;
    const createdRecords = await MarketMetadata.bulkCreate(records);
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

const deleteMarketMetadataRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await MarketMetadata.destroy({
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

module.exports = {
  fetchMarketMetadataRecords,
  fetchMarketMetadataRecordsPagination,
  updateMarketMetadataRecords,
  createMarketMetadataRecords,
  deleteMarketMetadataRecords,
};
