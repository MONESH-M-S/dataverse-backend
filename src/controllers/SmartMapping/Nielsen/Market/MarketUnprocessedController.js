const MaketUnprocessedModel = require('../../../../models/SmartMapping/Nielsen/Market/MarketUnprocessed.model')
const getPaginationDetails = require('../../../../utils/response/getPaginationDetails')
const marketUnprocessedColumns = require('../../../../constants/Excel-Columns/SmartMapping/Nielsen/Market/marketUnprocessedColumns')
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchMarketUnprocessed = async (req, res, next) => {
    try {
        const { Filename } = req.query;
        const { limit, offset } = getPaginationDetails(req);

        if (!Filename) {
            return res.json({
                message: "File name is not present in the req query"
            })
        }

        let whereClause = {
            Filename: Filename,
        };

        const result = await MaketUnprocessedModel.findAll({
            limit,
            offset,
            where: whereClause,
        });

        res.json({ result });

    } catch (err) {
        next(err);
    }
};

const fetchMarketUnprocessedPagination = async (req, res, next) => {
    try {
        const { Filename } = req.query;
        const { limit, offset, page, pageSize } = getPaginationDetails(req);

        let whereClause = {
            Filename: Filename,
        };

        const result = await MaketUnprocessedModel.count({
            limit,
            offset,
            where: whereClause,
        });

        res.json({ page, page_size: pageSize, total_count: result });
    } catch (err) {
        next(err);
    }
};

const downloadMarketUnprocessed = async (req, res, next) => {
    try {
        const { Filename } = req.query;

        const table = {};

        const whereClause = {
            Filename: Filename,
        };

        table.model = MaketUnprocessedModel;
        table.columns = marketUnprocessedColumns;

        const data = await table.model.findAll({
            where: whereClause,
        });

        sendAsExcelFile(res, table, Filename, data);
    } catch (error) {
        next(error);
    }
};

module.exports = { fetchMarketUnprocessed, fetchMarketUnprocessedPagination, downloadMarketUnprocessed }