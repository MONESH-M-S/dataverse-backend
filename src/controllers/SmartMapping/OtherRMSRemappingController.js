const FactOtherRMSModel = require("../../models/SmartMapping/FactOtherRMS.model");
const MarketOtherRMSModel = require("../../models/SmartMapping/MarketOtherRMS.model");
const PeriodOtherRMSModel = require("../../models/SmartMapping/PeriodOtherRMS.model");
const ProductOtherRMSModel = require("../../models/SmartMapping/ProductOtherRMS.model");
const { Sequelize, sequelize } = require("../../../models");
const { Op } = require("sequelize");
const statusTypeEnum = require("../../enums/statusType.enum");

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
  "product-name": "Productname",
  "max-attri-format": "Maxattriformat",
  "max-attri-if-rinse-off": "Maxattriifrinseoff",
  "max-attri-pack-type": "Maxattripacktype",
  "max-attri-benefit-claim": "Maxattribenefitclaim",
  "max-attri-target-use": "Maxattritargetuse",
  "max-attri-laundry-variants": "Maxattrilaundryvariants",
  "max-attri-if-concentrate": "Maxattriifconcentrate",
  "max-attri-gender": "Maxattrigender",
  "max-attri-if-high-suds": "Maxattriifhighsuds",
  "max-attri-if-antiperspirant": "Maxattriifantiperspirant",
  "max-attri-formation": "Maxattriformation",
  "max-attri-lifestage": "Maxattrilifestage",
  "max-attri-fat-content": "Maxattrifatcontent",
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

const otherRMSProducRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Product_Dropdowns[columnName];
    const options = await ProductOtherRMSModel.findAll({
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

const otherRMSPeriodRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Period_Dropdowns[columnName];
    const options = await PeriodOtherRMSModel.findAll({
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

const otherRMSMarketRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Market_Dropdowns[columnName];
    const options = await MarketOtherRMSModel.findAll({
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

const otherRMSFactRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Fact_Dropdowns[columnName];
    const options = await FactOtherRMSModel.findAll({
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

const updateOtherRMSRemappingProductValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";
    updatedValues["ConfidenceLevel"] = "HIGH";
    updatedValues["ConfidenceScore"] = "1";

    const updatedFile = await ProductOtherRMSModel.update(updatedValues, {
      where: {
        id,
      },
    });

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} record!`,
    });
  } catch (error) {
    next(error);
  }
};

const updateOtherRMSRemappingPeriodValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";
    updatedValues["ConfidenceLevel"] = "HIGH";
    updatedValues["ConfidenceScore"] = "1";

    const updatedFile = await PeriodOtherRMSModel.update(updatedValues, {
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

const updateOtherRMSRemappingMarketValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";
    updatedValues["Confidencelevel"] = "HIGH";

    const updatedFile = await MarketOtherRMSModel.update(updatedValues, {
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

const updateOtherRMSRemappingFactValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";
    updatedValues["Confidencelevel"] = "HIGH";
    updatedValues["Confidencescore"] = "1";

    const updatedFile = await FactOtherRMSModel.update(updatedValues, {
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
  otherRMSPeriodRemappingOptions,
  otherRMSMarketRemappingOptions,
  otherRMSFactRemappingOptions,
  otherRMSProducRemappingOptions,
  updateOtherRMSRemappingPeriodValues,
  updateOtherRMSRemappingMarketValues,
  updateOtherRMSRemappingFactValues,
  updateOtherRMSRemappingProductValues,
};
