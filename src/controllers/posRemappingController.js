const MappingProductOutputPos = require("../models/mappingProductOutputPOS.model");
const MappingPeriodOutputPos = require("../models/mappingPeriodOutputPOS.model");
const MappingMarketOutputPos = require("../models/mappingMarketOutputPOS.model");
const MappingFactOutputPos = require("../models/mappingFactOutputPOS.model");
const { Sequelize, sequelize } = require("../../models");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");

const Product_Dropdowns = {
  "division-name": "Divisionname",
  "category-name": "Categoryname",
  "market-name": "Marketname",
  "corporate-brand-name": "Corporatebrandname",
  "sector-name": "Sectorname",
  "segment-name": "Segmentname",
  "product-form-name": "Productformname",
  "form-name": "Formname",
  "sub-form-name": "Subformname",
  "sub-product-form-variant-name": "Spfvname",
  "product-pack-form-name": "Productpackformname",
  "product-pack-size-name": "Productpacksizename",
  "product-variant-name": "Productvariantname",
  "product-code-name": "Productcodename",
  "product-name": "Internaldesc",
};

const Period_Dropdowns = {
  periodicity: "Periodicity",
  year: "YearBr",
  quarter: "QuarterBr",
  month: "MonthBr",
  week: "WeekBr",
  "start-date": "PeriodStartDate",
  "end-date": "PeriodEndDate",
  tag: "Tag",
  "min-period": "MinPeriod",
  "max-period": "MaxPeriod",
  "country-week-start-day": "WeekStartDayCountry",
  "periodicity-identifer": "PeriodicityIdentifer",
  "month-number": "MonthNumber",
  "period-number": "PeriodNumberBr",
};

const Market_Dropdowns = {
  "unique-tag": "UniqueTag",
  "market-name": "Provider/MarketName",
  customer: "Customer",
  "store-name": "StoreName",
  "market-short": "MarketShort",
  "market-long": "MarketLong",
};

const Fact_Dropdowns = {
  "fact-type": "Facttype",
  "harmonized-name": "Harmonizedname",
};

const getWhereObjectFromQuery = (query) => {
  let whereClause = {};

  Object.keys(query).forEach((key) => {
    if (key === "PeriodStartDate") {
      whereClause[key] = {
        [Op.gte]: query[key],
      };
    } else if (key === "PeriodEndDate") {
      whereClause[key] = {
        [Op.lte]: query[key],
      };
    } else {
      whereClause[key] = query[key];
    }
  });

  return whereClause;
};

const posProductRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Product_Dropdowns[columnName];
    const options = await MappingProductOutputPos.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
      where: whereClause,
    });

    res.json(options);
  } catch (error) {
    next(error);
  }
};

const posPeriodRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Period_Dropdowns[columnName];
    const options = await MappingPeriodOutputPos.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
      where: whereClause,
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const posMarketRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Market_Dropdowns[columnName];
    const options = await MappingMarketOutputPos.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
      where: whereClause,
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const posFactRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Fact_Dropdowns[columnName];
    const options = await MappingFactOutputPos.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
      where: whereClause,
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const updatePosRemappingProductValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";

    const updatedFile = await MappingProductOutputPos.update(updatedValues, {
      where: { id },
    });

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} record!`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePosRemappingPeriodValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";

    const updatedFile = await MappingPeriodOutputPos.update(updatedValues, {
      where: {
        id,
      },
    });

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} record!`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePosRemappingMarketValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";

    const updatedFile = await MappingMarketOutputPos.update(updatedValues, {
      where: {
        id,
      },
    });

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} record!`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updatePosRemappingFactValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";

    const updatedFile = await MappingFactOutputPos.update(updatedValues, {
      where: {
        id,
      },
    });

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} record!`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  posProductRemappingOptions,
  posPeriodRemappingOptions,
  posMarketRemappingOptions,
  posFactRemappingOptions,
  updatePosRemappingProductValues,
  updatePosRemappingPeriodValues,
  updatePosRemappingMarketValues,
  updatePosRemappingFactValues,
};
