const { Sequelize } = require("../../../../models");
const { Op } = require("sequelize");
const MarketMappingModel = require('../../../models/SmartMapping/Nielsen/Market/MarketDetail.model');
const MarketMetaData = require("../../../models/marketMetaData.model");
const { Market_Dropdowns } = require('../../../constants/Remapping/remappingConstant')
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

const updateRemappingMarketValues = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["Confidencelevel"] = "HIGH";
        updatedValues["Confidencescore"] = "1";

        const updatedFile = await MarketMappingModel.update(updatedValues, {
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

module.exports = { marketRemappingOptions, updateRemappingMarketValues }
