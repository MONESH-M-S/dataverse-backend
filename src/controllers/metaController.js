const MappingFlagDetailsModel = require("../models/MappingFlagDetails.model");
const LoadLogModel = require("../models/loadLog.model");
const FactColumnMappingModel = require("../models/factColumnMapping.model");
const SmlPcatModel = require("../models/smlPcat.model");
const CellControlModel = require("../models/sourceDetails.model");
const { Sequelize, sequelize } = require("../../models");
const { Op } = require("sequelize");

const fetchCountryMeta = async (req, res, next) => {
  const { category } = req.query;

  let whereClause = {
    SOURCE: {
      [Op.in]: ["Nielsen", "POS"],
    },
    Country: {
      [Op.not]: null,
      [Op.not]: "CzechRepublic_BACKUP20230316",
    },
  };

  if (category) whereClause["CATEGORY"] = category;

  try {
    const countryList = await LoadLogModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("COUNTRY")), "name"],
      ],
      where: whereClause,
    });
    res.json(countryList);
  } catch (error) {
    next(error);
  }
};

const fetchProviderMeta = async (req, res, next) => {
  try {
    const data = await sequelize.query(`SELECT
    distinct
      CASE
        WHEN source = 'Nielsen' THEN 'Nielsen'
       WHEN source = 'POS' THEN 'POS'
           WHEN source = 'RMS' THEN category
      END AS name
    FROM info.LoadLog
    WHERE source NOT IN ('Nielsen-operations', 'POSOperations', 'POS_Operations', 'NielsenOperations')`);

    res.json(data[0]);
  } catch (error) {
    next(error);
  }
};

const fetchCategoryMeta = async (req, res, next) => {
  const { country } = req.query;
  let whereClause = {};
  if (country) whereClause["COUNTRY"] = country;

  try {
    const providerList = await FactColumnMappingModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("CATEGORY")), "name"],
      ],
      where: whereClause,
    });
    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

const fetchIMScenarioFlag = async (req, res, next) => {
  try {
    const scenarioFlag = await MappingFlagDetailsModel.findAll({
      where: {
        FlagDesc: "Mapped Already by IM Engine",
      },
    });
    res.json(scenarioFlag);
  } catch (error) {
    next(error);
  }
};

const fetchSmlPcatCategoryMeta = async (req, res, next) => {
  try {
    const { market, segment } = req.query;
    const whereClause = {};
    if (market) whereClause["DP_MARKET"] = market;
    if (segment) whereClause["DP_SEGMENT"] = segment;
    const list = await SmlPcatModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("DP_CATEGORY")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};
const fetchSmlPcatMarketMeta = async (req, res, next) => {
  try {
    const { category, segment } = req.query;
    const whereClause = {};
    if (category) whereClause["DP_CATEGORY"] = category;
    if (segment) whereClause["DP_SEGMENT"] = segment;
    const list = await SmlPcatModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("DP_MARKET")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};
const fetchSmlPcatSegmentMeta = async (req, res, next) => {
  try {
    const { category, market } = req.query;
    const whereClause = {};
    if (category) whereClause["DP_CATEGORY"] = category;
    if (market) whereClause["DP_MARKET"] = market;
    const list = await SmlPcatModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("DP_SEGMENT")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};

const fetchCellControlProviderMeta = async (req, res, next) => {
  try {
    const { country, category } = req.query;
    const whereClause = {};
    if (country) whereClause["Country"] = country;
    if (category) whereClause["Category"] = category;
    const list = await CellControlModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("DataProvider")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};
const fetchCellControlCountryMeta = async (req, res, next) => {
  try {
    const { provider, category } = req.query;
    const whereClause = {};
    if (provider) whereClause["DataProvider"] = provider;
    if (category) whereClause["Category"] = category;

    const list = await CellControlModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Country")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};
const fetchCellControlCategoryMeta = async (req, res, next) => {
  try {
    const { provider, country } = req.query;
    const whereClause = {};
    if (provider) whereClause["DataProvider"] = provider;
    if (country) whereClause["Country"] = country;
    const list = await CellControlModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Category")), "name"],
      ],
      where: whereClause,
    });
    res.json(list);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta,
  fetchIMScenarioFlag,
  fetchSmlPcatCategoryMeta,
  fetchSmlPcatMarketMeta,
  fetchSmlPcatSegmentMeta,
  fetchCellControlProviderMeta,
  fetchCellControlCountryMeta,
  fetchCellControlCategoryMeta,
};
