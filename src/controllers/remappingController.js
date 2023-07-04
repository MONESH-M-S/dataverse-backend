const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const SmartMappingFactDetailsModel = require("../models/smartMappingFactDetails.model");
const MappingPeriodOutput = require("../models/mappingPeriodOutput.model");
const MappingMarketOutput = require("../models/mappingMarketOutput.model");
const MarketMetaData = require("../models/marketMetaData.model");
const { Sequelize, sequelize } = require("../../models");
const { Op } = require("sequelize");
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

const productRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Product_Dropdowns[columnName];
    const options = await SmartMappingDetailsModel.findAll({
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

const factRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Fact_Dropdowns[columnName];
    const options = await SmartMappingFactDetailsModel.findAll({
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

const periodRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Period_Dropdowns[columnName];
    const options = await MappingPeriodOutput.findAll({
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

const marketRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    let dbColumnName = Market_Dropdowns[columnName];
    let modal = MappingMarketOutput;

    if (dbColumnName === "Channel" || dbColumnName === "TotalMarket") {
      modal = MarketMetaData;
      dbColumnName = dbColumnName === "TotalMarket" ? "Total" : dbColumnName;
    } else {
      modal = MappingMarketOutput;
    }

    const options = await modal.findAll({
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

const updateRemappingProductValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";

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
    updatedValues["Flag"] = "MM";

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
    updatedValues["Flag"] = "MM";

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
    updatedValues["Flag"] = "MM";

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
