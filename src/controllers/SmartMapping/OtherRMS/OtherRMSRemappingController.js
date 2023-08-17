const FactOtherRMSModel = require("../../../models/SmartMapping/OtherRms/FactOtherRMS.model");
const MarketOtherRMSModel = require("../../../models/SmartMapping/OtherRms/MarketOtherRMS.model");
const PeriodOtherRMSModel = require("../../../models/SmartMapping/OtherRms/PeriodOtherRMS.model");
const { Fact_Dropdowns, Period_Dropdowns, Market_Dropdowns } = require('../../../constants/dropDown/remappingConstant')
const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const statusTypeEnum = require("../../../enums/statusType.enum");

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
  updateOtherRMSRemappingPeriodValues,
  updateOtherRMSRemappingMarketValues,
  updateOtherRMSRemappingFactValues,
};
