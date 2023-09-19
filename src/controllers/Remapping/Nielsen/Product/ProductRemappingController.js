const { Sequelize, sequelize } = require("../../../../../models");
const { Op } = require("sequelize");
const productUnprocessedModel = require("../../../../models/SmartMapping/Nielsen/Product/ProductUnproccessed.model");
const {
  Product_Dropdowns,
} = require("../../../../constants/Remapping/remappingConstant");
const SmlPcatModel = require("../../../../models/Admin/smlPcat.model");
const statusTypeEnum = require("../../../../enums/statusType.enum");
const ProductMappingModel = require("../../../../models/SmartMapping/Nielsen/Product/ProductDetail.model");
const InteralULDataModel = require("../../../../models/SmartMapping/Nielsen/Product/InternalULData.model");

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

const productRemappingOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Product_Dropdowns[columnName];
    const options = await ProductMappingModel.findAll({
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
    updatedValues["Confidencelevel"] = "HIGH";
    updatedValues["Confidencescore"] = "1";

    const updatedFile = await ProductMappingModel.update(updatedValues, {
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

const productRemappingUnprocessedOptions = async (req, res, next) => {
  try {
    const whereClause = getWhereObjectFromQuery(req.query);

    const columnName = req.params.columnName;
    const dbColumnName = Product_Dropdowns[columnName];

    const unprocessedRemappingTable = [
      "Maxattriformat",
      "Maxattriifrinseoff",
      "Maxattripacktype",
      "Maxattribenefitclaim",
      "Maxattritargetuse",
      "Maxattrilaundryvariants",
      "Maxattriifconcentrate",
      "Maxattrigender",
      "Maxattriifhighsuds",
      "Maxattriifantiperspirant",
      "Maxattriformation",
      "Maxattrilifestage",
      "Maxattrifatcontent",
    ];

    let modal = InteralULDataModel;
    let updateWhereClause = {};

    if (unprocessedRemappingTable.includes(dbColumnName)) {
      modal = SmlPcatModel;

      if (Object.keys(whereClause).length) {
        updateWhereClause = Object.keys(whereClause)
          .filter((key) => unprocessedRemappingTable.includes(key))
          .reduce((acc, key) => {
            acc[key] = whereClause[key];
            return acc;
          }, {});
      }
    } else {
      modal = InteralULDataModel;

      if (Object.keys(whereClause).length) {
        updateWhereClause = Object.keys(whereClause)
          .filter((key) => !unprocessedRemappingTable.includes(key))
          .reduce((acc, key) => {
            acc[key] = whereClause[key];
            return acc;
          }, {});
      }
    }

    const options = await modal.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
      ],
      where: updateWhereClause,
    });

    res.json(options);
  } catch (error) {
    next(error);
  }
};

const updateRemappingUnprocessedProductOptions = async (req, res, next) => {
  try {
    const updatedValues = req.body;

    let queryArr = [];

    if (Object.values(updatedValues).length) {
      Object.values(updatedValues).forEach((value) => {
        queryArr.push(value === "NULL" ? null : value);
      });
    }

    let paramArr = Array(queryArr.length).fill("?");

    const updatedFile = await sequelize.query(
      `exec [Mapping].[spRemappingUnprocessed] ${paramArr.join(", ")}`,
      { replacements: queryArr }
    );

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated!`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  productRemappingOptions,
  updateRemappingProductValues,
  productRemappingUnprocessedOptions,
  updateRemappingUnprocessedProductOptions,
};
