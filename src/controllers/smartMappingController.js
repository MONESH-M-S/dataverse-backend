const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");

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

const addSmartDataList = async (req, res, next) => {
    try {


        await SmartMappingListModel.bulkCreate(data)
        res.json({
            "status": "success",
            "message": "Successfully uploaded the data"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    fetchSmatMappingList,
    addSmartDataList
}