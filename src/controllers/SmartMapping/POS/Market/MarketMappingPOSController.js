const MarketMappingPOSModel = require('../../../../models/SmartMapping/POS/Market/MarketDetailPOS.model')
const getPaginationDetails = require('../../../../utils/response/getPaginationDetails')
const sendAsExcelFile = require('../../../../utils/response/sendAsExcelFile')
const marketMappedColumns = require('../../../../constants/Excel-Columns/SmartMapping/POS/Market/posMarketMappedColumns')

const fetchMarketPOSMapping = async (req, res, next) => {
    try {
        const { limit, offset } = getPaginationDetails(req);

        const { Filename, Search } = req.query;

        const whereClause = {
            Filename: Filename,
        };

        if (Search) {
            whereClause[Op.or] = [
                { MarketLong: { [Op.like]: `%${Search.trim()}%` } },
                { UniqueTag: { [Op.like]: `%${Search.trim()}%` } },
            ];
        }


        const result = await MarketMappingPOSModel.findAll({
            limit,
            offset,
            where: whereClause,
        });

        res.json({ result: result });
    } catch (error) {
        next(error);
    }
};
const fetchMarketPOSMappingPagination = async (req, res, next) => {
    try {
        const { page, pageSize, limit, offset } = getPaginationDetails(req);

        const { Filename, Search } = req.query;

        const whereClause = {
            Filename: Filename,
        };

        if (Search) {
            whereClause[Op.or] = [
                { MarketLong: { [Op.like]: `%${Search.trim()}%` } },
                { UniqueTag: { [Op.like]: `%${Search.trim()}%` } },
            ];
        }

        const count = await MarketMappingPOSModel.count({
            limit,
            offset,
            where: whereClause,
        });

        const responseObj = {
            page,
            page_size: pageSize,
            total_count: count,
        };

        res.json(responseObj);
    } catch (error) {
        next(error);
    }
};

const downloadMarketPosMapping = async (req, res, next) => {
    try {
        const { Filename } = req.query;

        const whereClause = {
            Filename: Filename,
        };

        const table = {};

        table.model = MarketMappingPOSModel;
        table.columns = marketMappedColumns;
        const data = await table.model.findAll({
            where: whereClause,
        });

        sendAsExcelFile(res, table, Filename, data);
    } catch (error) {
        next(error);
    }
};


module.exports = { fetchMarketPOSMapping, fetchMarketPOSMappingPagination, downloadMarketPosMapping }