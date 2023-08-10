const PeriodMappingPOSModel = require('../../../../models/SmartMapping/POS/Product/ProductDetailPOS.model')
const getPaginationDetails = require('../../../../utils/response/getPaginationDetails')
const sendAsExcelFile = require('../../../../utils/response/sendAsExcelFile')
const periodMappedColumns = require('../../../../constants/Excel-Columns/SmartMapping/POS/Period/posPeriodMappedColumns')

const fetchPeriodPOSMapping = async (req, res, next) => {
    try {
        const { limit, offset } = getPaginationDetails(req);

        const { Filename, Search } = req.query;

        const whereClause = {
            Filename: Filename,
        };

        if (Search) {
            whereClause[Op.or] = [{ Tag: { [Op.like]: `%${Search.trim()}%` } }];
        }

        const result = await PeriodMappingPOSModel.findAll({
            limit,
            offset,
            where: whereClause
        });

        res.json({ result: result });
    } catch (error) {
        next(error);
    }
};
const fetchPeriodPOSMappingPagination = async (req, res, next) => {
    try {
        const { limit, offset, page, pageSize } = getPaginationDetails(req);

        const { Filename, Search } = req.query;

        const whereClause = {
            Filename: Filename,
        };

        if (Search) {
            whereClause[Op.or] = [{
                Tag: {
                    [Op.like]: `%${Search.trim()}%`
                }
            }];
        }

        const count = await PeriodMappingPOSModel.count({
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

const downloadPeriodPOSMapping = async (req, res, next) => {
    try {

        const { Filename } = req.query;

        const table = {};

        const whereClause = {
            Filename: Filename,
        };

        table.model = PeriodMappingPOSModel;
        table.columns = periodMappedColumns;

        const data = await table.model.findAll({
            where: whereClause
        });

        sendAsExcelFile(res, table, Filename, data);
    } catch (error) {
        next(error);
    }
};

module.exports = { fetchPeriodPOSMapping, fetchPeriodPOSMappingPagination, downloadPeriodPOSMapping }