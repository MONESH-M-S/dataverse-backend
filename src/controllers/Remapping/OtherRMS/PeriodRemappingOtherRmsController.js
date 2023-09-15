const PeriodOtherRMSModel = require("../../../models/SmartMapping/OtherRms/Period/PeriodOtherRMS.model");
const { Period_Dropdowns } = require("../../../constants/Remapping/remappingConstant");
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
 
  
  module.exports = { otherRMSPeriodRemappingOptions, updateOtherRMSRemappingPeriodValues }