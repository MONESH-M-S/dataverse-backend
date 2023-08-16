const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const { Product_Dropdowns, Fact_Dropdowns, Period_Dropdowns, Market_Dropdowns } = require('../../../constants/dropDown/remappingConstant')
const ProductMappingModel = require('../../../models/SmartMapping/Nielsen/Product/ProductDetail.model')
const FactMappingModel = require('../../../models/SmartMapping/Nielsen/Fact/FactDetail.model')
const PeriodMappingModel = require('../../../models/SmartMapping/Nielsen/Period/PeriodDetail.model');
const MarketMappingModel = require('../../../models/SmartMapping/Nielsen/Market/MarketDetail.model');
const MarketMetaData = require("../../../models/marketMetaData.model");


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

const factRemappingOptions = async (req, res, next) => {
    try {
        const whereClause = getWhereObjectFromQuery(req.query);

        const columnName = req.params.columnName;
        const dbColumnName = Fact_Dropdowns[columnName];
        const options = await FactMappingModel.findAll({
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

const periodRemappingOptions = async (req, res, next) => {
    try {
        const whereClause = getWhereObjectFromQuery(req.query);

        const columnName = req.params.columnName;
        const dbColumnName = Period_Dropdowns[columnName];
        const options = await PeriodMappingModel.findAll({
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

const marketRemappingOptions = async (req, res, next) => {
    try {
        const whereClause = getWhereObjectFromQuery(req.query);

        const columnName = req.params.columnName;
        let dbColumnName = Market_Dropdowns[columnName];
        let modal = MarketMappingModel;

        if (dbColumnName === "Channel" || dbColumnName === "TotalMarket") {
            modal = MarketMetaData;
            dbColumnName = dbColumnName === "TotalMarket" ? "Total" : dbColumnName;
        } else {
            modal = MarketMappingModel;
        }

        const options = await modal.findAll({
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

module.exports = { productRemappingOptions, factRemappingOptions, periodRemappingOptions, marketRemappingOptions }