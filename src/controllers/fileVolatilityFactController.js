const FactColumnMappingModel = require("../models/factColumnMapping.model");

const fetchFactColumnMappings = async (req, res, next) => {
  try {
    const { fileName } = req.query;

    const mappingList = await FactColumnMappingModel.findAll({
      where: {
        ZipFileName: fileName,
        Entity: "Fact",
      },
    });

    const responseObj = {
      result: mappingList,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchFactColumnMappings };
