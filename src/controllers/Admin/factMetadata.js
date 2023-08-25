const FactMetadata = require("../../models/Admin/FactMetadata.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");
const { Sequelize } = require("../../../models");
const { Op } = require("sequelize");

const fetchFactMetadataRecords = async (req, res, next) => {
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

    const factMetadataList = await FactMetadata.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = { result: factMetadataList };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchFactMetadataRecordsPagination = async (req, res, next) => {
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

    const factCount = await FactMetadata.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: factCount,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const updateFactMetadataRecords = async (req, res, next) => {
  try {
    const data = req.body.records;

    if (data.length) {
      for (const record of data) {
        const { Id, ...rest } = record;

        await FactMetadata.update(rest, {
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

const createFactMetadataRecords = async (req, res, next) => {
  try {
    const { records } = req.body;
    const createdRecords = await FactMetadata.bulkCreate(records);
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

const deleteFactMetadataRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await FactMetadata.destroy({
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

//META CONTROLLER FOR FACT

const fetchFactCellMeta = async (req, res, next) => {
  try {
    const { country, market } = req.query;

    const whereClause = {};

    if (country) whereClause["CountryName"] = country;
    if (market) whereClause["NielsenMarketName"] = market;

    const list = await FactMetadata.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("Cell")), "name"]],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

const fetchFactCountryMeta = async (req, res, next) => {
  try {
    const { cell, market } = req.query;
    const whereClause = {};

    if (cell) whereClause["Cell"] = cell;
    if (market) whereClause["NielsenMarketName"] = market;

    const list = await FactMetadata.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("CountryName")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

const fetchFactNielsenMarketMeta = async (req, res, next) => {
  try {
    const { cell, country } = req.query;
    const whereClause = {};

    if (cell) whereClause["Cell"] = cell;
    if (country) whereClause["CountryName"] = country;

    const list = await FactMetadata.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("NielsenMarketName")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchFactMetadataRecords,
  fetchFactMetadataRecordsPagination,
  updateFactMetadataRecords,
  createFactMetadataRecords,
  deleteFactMetadataRecords,
  fetchFactCellMeta,
  fetchFactCountryMeta,
  fetchFactNielsenMarketMeta,
};
