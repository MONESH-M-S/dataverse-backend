const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");

const fetchSmatMappingList = async (req, res, next) => {
    try {

        const { limit, offset, page, pageSize } = getPaginationDetails(req)
        const { search, orderKey, orderValue } = req.query

        let whereClause = {}
        let orderClause = []

        if (search) {
            whereClause = {
                "file_name": {
                    [Op.like]: "%" + search + "%",
                }
            }
        }

        if (orderKey || orderValue) {
            orderClause = [[
                orderKey ?? "id",
                orderValue ?? "DESC"
            ]]
        }

        const mappingDataList = await SmartMappingListModel.findAndCountAll({
            limit,
            offset,
            where: whereClause,
            order: orderClause
        });

        let responseObj = {
            result: mappingDataList.rows,
            page,
            page_size: pageSize,
            total_count: mappingDataList.count
        }

        res.json(responseObj)
    } catch (error) {
        console.error("Error is ", error)
        next(error)
    }
}

const fetchSmartMappingDashboardCount = async (req, res, next) => {

    try {
        const mappingListCount = await SmartMappingListModel.count();
        const excelFileCount = await SmartMappingListModel.count({
            where: {
                "file_extension": "xlsx"
            }
        });
        const csvFileCount = await SmartMappingListModel.count({
            where: {
                "file_extension": "csv"
            }
        })
        const docFileCount = await SmartMappingListModel.count({
            where: {
                "file_extension": "doc"
            }
        })

        res.json({
            status: statusTypeEnum.success,
            data: {
                "total_count": mappingListCount,
                "excel_count": excelFileCount,
                "csv_count": csvFileCount,
                "doc_count": docFileCount
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchSmatMappingList,
    fetchSmartMappingDashboardCount
}