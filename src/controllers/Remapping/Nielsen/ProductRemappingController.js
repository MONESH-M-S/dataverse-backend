const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const productUnprocessedModel = require("../../../models/SmartMapping/Nielsen/Product/ProductUnproccessed.model");
const { Product_Dropdowns } = require('../../../constants/Remapping/remappingConstant')
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
                id
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
        const options = await productUnprocessedModel.findAll({
            attributes: [
                [Sequelize.fn("DISTINCT", Sequelize.col(dbColumnName)), "name"],
            ],
            where: whereClause,
        });

        res.json(options);

    } catch (error) {
        next(error)
    }
}

const updateRemappingUnprocessedProductOptions = async (req, res, next) => {

    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["Confidencelevel"] = "HIGH";
        updatedValues["Confidencescore"] = "1";

        const updatedFile = await productUnprocessedModel.update(updatedValues, {
            where: {
                id
            },
        });

        res.json({
            status: statusTypeEnum.success,
            message: `Successfully updated ${updatedFile[0]} record!`,
        });

    } catch (error) {
        next(error)
    }
}


module.exports = {
    productRemappingOptions,
    updateRemappingProductValues,
    productRemappingUnprocessedOptions,
    updateRemappingUnprocessedProductOptions
}