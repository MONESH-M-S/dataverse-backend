const FactColumnMappingModel = require("../models/factColumnMapping.model");
const statusTypeEnum = require("../enums/statusType.enum");

const fetchFactColumnMappings = async (req, res, next) => {
  try {
    const { fileName } = req.query;

    const fileData = await FactColumnMappingModel.findOne({
      where: {
        ZipFileName: fileName,
        Entity: "Fact",
      },
    });

    const responseObj = {
      result: fileData,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const updateColumnMappingValues = async (req, res, next) => {
  try {
    const { ZipFileName, Entity, FileName } = req.query;
    const { SourceColumn } = req.body;

    const updatedFile = await FactColumnMappingModel.update(
      {
        SourceColumn,
      },
      {
        where: {
          ZipFileName,
          Entity,
          FileName,
        },
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

module.exports = { fetchFactColumnMappings, updateColumnMappingValues };
