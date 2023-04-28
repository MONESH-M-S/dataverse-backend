const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const SmartMappingFactDetailsModel = require("../models/smartMappingFactDetails.model");
const MappingPeriodOutput = require("../models/mappingPeriodOutput.model");
const MappingMarketOutput = require("../models/mappingMarketOutput.model");
const { Sequelize } = require("../../models");
const statusTypeEnum = require("../enums/statusType.enum");

const Product_Dropdowns = {
  "internal-product-description": "ProductName",
  "category-name": "Categoryname",
  "market-name": "Marketname",
  "corporate-brand-name": "Corporatebrandname",
  "product-form-name": "Productformname",
  "sub-product-form-variant-name": "Spfvname",
  "division-name": "Divisionname",
  "sector-name": "Sectorname",
  "segment-name": "Segmentname",
  "form-name": "Formname",
  "sub-form-name": "Subformname",
  "product-pack-form-name": "Productpackformname",
  "product-pack-size-name": "Productpacksizename",
  "product-variant-name": "Productvariantname",
  "product-code-name": "Productcodename",
};

const Fact_Dropdowns = {
  "internal-fact-description": "Harmonizedname",
  "internal-fact-type": "Facttype",
};

const Period_Dropdowns = {
  periodicity: "Periodicity",
  year: "YearBr",
  quarter: "QuarterBr",
  month: "MonthBr",
  week: "WeekBr",
  "start-date": "PeriodStartDate",
  "end-date": "PeriodEndDate",
  "min-period-number": "MinPeriodNumBr",
  "max-period-number": "MaxPeriodNumBr",
  "country-week-start-day": "WeekStartDayCountry",
  "periodicity-identifer": "PeriodicityIdentifer",
  convention: "Convention",
  "period-number": "PeriodNumberBr",
};

const Market_Dropdowns = {
  cell: "Cell",
  country: "Country",
  category: "Category",
  channel: "Channel",
  "total-market": "TotalMarket",
};

const productRemappingOptions = async (req, res, next) => {
  try {
    const columnName = req.params.columnName;
    const dbColumnName = Product_Dropdowns[columnName];
    const options = await SmartMappingDetailsModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const factRemappingOptions = async (req, res, next) => {
  try {
    const columnName = req.params.columnName;
    const dbColumnName = Fact_Dropdowns[columnName];
    const options = await SmartMappingFactDetailsModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const periodRemappingOptions = async (req, res, next) => {
  try {
    const columnName = req.params.columnName;
    const dbColumnName = Period_Dropdowns[columnName];
    const options = await MappingPeriodOutput.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const marketRemappingOptions = async (req, res, next) => {
  try {
    const columnName = req.params.columnName;
    const dbColumnName = Market_Dropdowns[columnName];
    const options = await MappingMarketOutput.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

const updateRemappingProductValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;

    const updatedFile = await SmartMappingDetailsModel.update(updatedValues, {
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

const updateRemappingFactValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;

    const updatedFile = await SmartMappingFactDetailsModel.update(
      updatedValues,
      {
        where: { id },
      }
    );

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} record!`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRemappingPeriodValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;

    const updatedFile = await MappingPeriodOutput.update(updatedValues, {
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

const updateRemappingMarketValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;

    const updatedFile = await MappingMarketOutput.update(updatedValues, {
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
  productRemappingOptions,
  factRemappingOptions,
  periodRemappingOptions,
  marketRemappingOptions,
  updateRemappingProductValues,
  updateRemappingFactValues,
  updateRemappingPeriodValues,
  updateRemappingMarketValues,
};
