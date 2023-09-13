const ProductOtherRMSModel =  require('../../../models/SmartMapping/OtherRms/ProductOtherRMS.model')
const { Product_Dropdowns } = require("../../../constants/dropDown/remappingConstant");
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

const otherRMSProductRemappingOptions = async (req, res, next) => {
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
  

  module.exports = { otherRMSProductRemappingOptions, updateOtherRMSRemappingProductValues }