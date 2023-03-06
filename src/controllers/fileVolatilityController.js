const db = require("../../models")
const getPaginationDetails = require("../utils/response/getPaginationDetails")
const { Op } = require("sequelize");

const fetchVolatilityList = async (req, res, next) => {
    try {
        const { limit, offset, page, pageSize } = getPaginationDetails(req)
        const {
            search, filter_by_provider: filterByProvider, filter_by_category: filterByCategory,
            filter_by_status: filterByStatus, filter_by_country: filterByCountry
        } = req.query

        let whereClause = {}

        if (filterByProvider) {
            whereClause['SOURCE'] = filterByProvider
        }

        if (filterByCategory) {
            whereClause['CATEGORY'] = filterByCategory
        }

        if (search) {
            whereClause["FILE_NAME"] = {
                [Op.like]: "%" + search + "%",
            }
            // whereClause["MARKET"] = {
            //     [Op.like]: "%" + search + "%",
            // }
        }

        if (filterByStatus) {
            whereClause["PIPELINE_STATUS"] = {
                [Op.in]: filterByStatus.split(",")
            }
        }

        if(filterByCountry){
            whereClause["COUNTRY"] = {
                [Op.in]: filterByCountry.split(",")
            }
        }

        const volatilityList = await db.LeadLog.findAndCountAll({
            limit,
            offset,
            where: whereClause,
        })

        const responseObj = {
            result: volatilityList.rows,
            page,
            page_size: pageSize,
            total_count: volatilityList.count
        }

        res.json(responseObj)
    } catch (error) {
        next(error)
    }
}

const fetchIndividualVolatilityFile = async (req, res, next) => {

    try {
        const { id } = req.params
        const data = await db.LeadLog.findByPk(id)
        res.json(data)
    } catch (error) {
        next(error)
    }

}

module.exports = {
    fetchVolatilityList,
    fetchIndividualVolatilityFile
}