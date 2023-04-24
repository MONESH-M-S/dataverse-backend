const SmartMappingFactDetailsModel = require("../models/smartMappingFactDetails.model");
const { Sequelize } = require("../../models");

const Fact_Dropdowns = {
  "internal-fact-description": "Harmonizedname",
  "internal-fact-type": "Facttype",
};

const factRemappingOptions = async (req, res, next) => {
  try {
    const columnName = req.params.columnName;
    const dbColumnName = Fact_Dropdowns[columnName];
    console.log(dbColumnName);
    const options = await SmartMappingFactDetailsModel.findAndCountAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
    });
    res.json(options);
  } catch (error) {
    next(error);
  }
};

module.exports = { factRemappingOptions };
