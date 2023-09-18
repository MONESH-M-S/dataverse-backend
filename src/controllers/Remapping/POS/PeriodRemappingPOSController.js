const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const PeriodPOSModel = require("../../../models/SmartMapping/POS/Period/PeriodDetailPOS.model");
const {
  Period_Dropdowns,
} = require("../../../constants/Remapping/remappingPOSConstant");
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

const posPeriodRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Period_Dropdowns[columnName];
    const options = await PeriodPOSModel.findAll({
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

const updatePosRemappingPeriodValues = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    updatedValues["Flag"] = "MM";
    updatedValues["ConfidenceLevel"] = "HIGH";
    updatedValues["ConfidenceScore"] = "1";

    const updatedFile = await PeriodPOSModel.update(updatedValues, {
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

module.exports = { posPeriodRemappingOptions, updatePosRemappingPeriodValues };
