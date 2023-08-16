const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const ProductPOSModel = require('../../../models/SmartMapping/POS/Product/ProductDetailPOS.model');
const FactPOSModel = require('../../../models/SmartMapping/POS/Fact/FactDetailPOS.model');
const PeriodPOSModel = require('../../../models/SmartMapping/POS/Period/PeriodDetailPOS.model')
const MarketPOSModel = require('../../../models/SmartMapping/POS/Market/MarketDetailPOS.model')
const { Product_Dropdowns, Fact_Dropdowns, Market_Dropdowns, Period_Dropdowns } = require('../../../constants/dropDown/remappingPOSConstant')


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

const posProductRemappingOptions = async (req, res, next) => {
    try {
        const whereClause = getWhereObjectFromQuery(req.query);

        const columnName = req.params.columnName;
        const dbColumnName = Product_Dropdowns[columnName];
        const options = await ProductPOSModel.findAll({
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

const posMarketRemappingOptions = async (req, res, next) => {
    try {
        const whereClause = getWhereObjectFromQuery(req.query);

        const columnName = req.params.columnName;
        const dbColumnName = Market_Dropdowns[columnName];
        const options = await MarketPOSModel.findAll({
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

const posFactRemappingOptions = async (req, res, next) => {
    try {
        const whereClause = getWhereObjectFromQuery(req.query);

        const columnName = req.params.columnName;
        const dbColumnName = Fact_Dropdowns[columnName];
        const options = await FactPOSModel.findAll({
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


module.exports = { posProductRemappingOptions, posPeriodRemappingOptions, posFactRemappingOptions, posMarketRemappingOptions }