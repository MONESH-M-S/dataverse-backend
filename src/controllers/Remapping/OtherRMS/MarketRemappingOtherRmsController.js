const MarketOtherRMSModel = require("../../../models/SmartMapping/OtherRms/Market/MarketOtherRMS.model");
const {
  Market_Dropdowns,
} = require("../../../constants/Remapping/remappingConstant");
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
      whereClause[key] = query[key]
        ? query[key] === "NULL"
          ? null
          : query[key]
        : null;
    }
  });
  return whereClause;
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

const updateOtherRMSRemappingMarketValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";
    updatedValues["Confidencelevel"] = "HIGH";
    updatedValues["Confidencescore"] = "1";

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
    next(error);
  }
};

module.exports = {
  otherRMSMarketRemappingOptions,
  updateOtherRMSRemappingMarketValues,
};
