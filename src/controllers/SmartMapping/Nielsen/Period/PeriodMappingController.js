const PeriodMappingModel = require('../../../../models/SmartMapping/Nielsen/Period/PeriodDetail.model')
const getPaginationDetails = require('../../../../utils/response/getPaginationDetails')
const periodMappedColumns = require('../../../../constants/Excel-Columns/SmartMapping/Nielsen/Period/periodMappedColumns')
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchPeriodMapping = async (req, res, next) => {
    try {
        const { Filename, search } = req.query;

        const { limit, offset } = getPaginationDetails(req);

        const whereClause = {
            Filename: Filename
        }

        if (search) {
            whereClause[Op.or] = [
                { Short: { [Op.like]: `%${search.trim()}%` } },
                { Long: { [Op.like]: `%${search.trim()}%` } },
                { Periodicity: { [Op.like]: `%${search.trim()}%` } },
                { Tag: { [Op.like]: `%${search}%` } },
            ];
        }
        const result = await PeriodMappingModel.findAll({
            limit,
            offset,
            where: whereClause,
        });

        res.json({ result: result });

    } catch (error) {
        next(error);
    }
};


const fetchPeriodMappingPagination = async (
    req,
    res,
    next
) => {
    try {

        const { Filename, search } = req.query;

        const { limit, offset, page, pageSize } = getPaginationDetails(req);

        let whereClause = {
            Filename: Filename
        };

        if (search) {
            whereClause[Op.or] = [
                { Short: { [Op.like]: `%${search.trim()}%` } },
                { Long: { [Op.like]: `%${search.trim()}%` } },
                { Periodicity: { [Op.like]: `%${search.trim()}%` } },
                { Tag: { [Op.like]: `%${search}%` } },
            ];
        }

        const result = await PeriodMappingModel.count({
            limit,
            offset,
            where: whereClause,
        });

        const responseObj = {
            page,
            page_size: pageSize,
            total_count: result,
        };

        res.json(responseObj);
    } catch (error) {
        next(error);
    }
};


const downloadPeriodMapping = async (req, res, next) => {
    try {

        const { Filename } = req.query;

        const table = {};

        let whereClause = {
            Filename: Filename
        };

        table.model = PeriodMappingModel;
        table.columns = periodMappedColumns;

        const data = await table.model.findAll({
            where: whereClause,
        });

        sendAsExcelFile(res, table, Filename, data);
    } catch (error) {
        next(error);
    }
};


module.exports = { fetchPeriodMapping, fetchPeriodMappingPagination, downloadPeriodMapping }