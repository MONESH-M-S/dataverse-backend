const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const MarketPOSModel = require('../../../models/SmartMapping/POS/Market/MarketDetailPOS.model')
const { Market_Dropdowns } = require('../../../constants/dropDown/remappingPOSConstant')

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

const updatePosRemappingMarketValues = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["ConfidenceLevel"] = "HIGH";
        updatedValues["ConfidenceScore"] = "1";

        const updatedFile = await MarketPOSModel.update(updatedValues, {
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

module.exports = { posMarketRemappingOptions, updatePosRemappingMarketValues }