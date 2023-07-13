const MappingFlagDetailsModel = require("../models/MappingFlagDetails.model");
const LoadLogModel = require("../models/loadLog.model");
const FactColumnMappingModel = require("../models/factColumnMapping.model");
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
    WHERE source NOT IN ('Nielsen-operations', 'POSOperations', 'POS_Operations', 'NielsenOperations')`)

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

module.exports = {
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta,
  fetchIMScenarioFlag,
};
