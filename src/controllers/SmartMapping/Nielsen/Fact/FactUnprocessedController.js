const FactUnprocessedModel = require('../../../../models/SmartMapping/Nielsen/Fact/FactUnprocessed.model');
const getPaginationDetails = require('../../../../utils/response/getPaginationDetails')
const factUnprocessedColumn = require('../../../../constants/Excel-Columns/SmartMapping/Nielsen/Fact/factUnprocessedColumn')
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchFactUnprocessed = async (req, res, next) => {
    try {
        const { Filename, Search } = req.query;
        const { limit, offset } = getPaginationDetails(req);

        let whereClause = {
            Filename: Filename,
        };

        if (Search) {
            whereClause["Externaldesc"] = {
                [Op.like]: "%" + Search + "%",
            };
        }

        const result = await FactUnprocessedModel.findAll({
            limit,
            offset,
            where: whereClause,

        });

        res.json({ result: result });
    } catch (err) {
        next(err);
    }
};

const fetchFactUnprocessedPagination = async (req, res, next) => {
    try {
        const { Filename, Search } = req.query;
        const { limit, offset, page, pageSize } = getPaginationDetails(req);

        let whereClause = {
            Filename: Filename,
        };

        if (Search) {
            whereClause["Externaldesc"] = {
                [Op.like]: "%" + Search + "%",
            };
        }

        const count = await FactUnprocessedModel.count({
            limit,
            offset,
            where: whereClause,
        });

        const responseObj = {
            page,
            page_size: pageSize,
            total_count: count
        }
        
        res.json(responseObj);
    } catch (err) {
        next(err);
    }
};

const downloadFactUnprocessed = async (req, res, next) => {
    try {
        const { Filename } = req.query;

        const table = {}

        const whereClause = {
            Filename: Filename,
        };

        table.model = FactUnprocessedModel
        table.columns = factUnprocessedColumn

        const data = await table.model.findAll({
            where: whereClause,
        });

        sendAsExcelFile(res, table, Filename, data);
    } catch (error) {
        next(error);
    }
};

module.exports = { fetchFactUnprocessed, fetchFactUnprocessedPagination, downloadFactUnprocessed }