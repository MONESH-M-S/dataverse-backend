const db = require("../../models")
const getPaginationDetails = require("../utils/response/getPaginationDetails")
const { Op } = require("sequelize");
const readExcel = require('read-excel-file/node')
const LoadLogModel = require('../models/loadLog.model')
const xlsx = require('xlsx');
const fs = require("fs");
const statusTypeEnum = require("../enums/statusType.enum");
const LoadLogDetailModel = require("../models/loadLogDetail.model");
const ColumnMappingModel = require("../models/columnMapping.model");
const { sequelize } = require("../../models");

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
            // whereClause['CATEGORY'] = filterByCategory
        }

        if (search) {
            whereClause["FILE_NAME"] = {
                [Op.like]: "%" + search + "%",
            }
            whereClause["MARKET"] = {
                [Op.like]: "%" + search + "%",
            }
        }

        if (filterByStatus) {
            whereClause["PIPELINE_STATUS"] = {
                [Op.in]: filterByStatus.split(",")
            }
        }

        if (filterByCountry) {
            whereClause["COUNTRY"] = {
                [Op.in]: filterByCountry.split(",")
            }
        }

        const volatilityList = await LoadLogModel.findAndCountAll({
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
        const data = await LoadLogModel.findByPk(id)
        res.json(data)
    } catch (error) {
        next(error)
    }

}

const fetchColumnMappings = async (req, res, next) => {
    try {
        const { fileName } = req.params

        const mappingList = await ColumnMappingModel.findAll({
            where: {
                FileName: fileName
            }
        })

        const responseObj = {
            result: mappingList
        }

        res.json(responseObj)

    } catch (error) {
        next(error)
    }
}

const updateColumnMapping = async (req, res, next) => {
    try {

        const data = req.body.mappings

        const statements = [];
        const tableName = "ColumnMapping";
        const schema = "metadata";

        //  Added Raw Query, since MSSQL doesn't support Bulk Upload
        for (let i = 0; i < data.length; i++) {
            statements.push(
                sequelize.query(
                    `UPDATE [${schema}].[${tableName}] 
                    SET SourceColumn='${data[i].SourceColumn}' 
                    WHERE ID=${data[i].ID};`
                )
            );
        }

        await Promise.all(statements);

        res.json({
            message: "Successfully updated"
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}

const fetchDashboardDetails = async (req, res, next) => {
    const mappingListCount = await LoadLogModel.count();
    const excelFileCount = await LoadLogModel.count({
        where: {
            "FILENAME": {
                [Op.endsWith]: "xlsx",
            }

        },
    });
    const csvFileCount = await LoadLogModel.count({
        where: {
            "FILENAME": {
                [Op.endsWith]: "csv",
            }
        }
    });
    const docFileCount = await LoadLogModel.count({
        where: {
            "FILENAME": {
                [Op.endsWith]: "doc",
            }
        },
    });

    res.json({
        status: statusTypeEnum.success,
        data: {
            total_count: mappingListCount,
            excel_count: excelFileCount,
            csv_count: csvFileCount,
            doc_count: docFileCount,
        },
    });
}

const fetchLeadLogDetails = async (req, res, next) => {
    try {
        const { limit, offset, page, pageSize } = getPaginationDetails(req)

        const { id } = req.params
        const logDetailList = await LoadLogDetailModel.findAndCountAll({
            where: {
                LogId: id,
            },
            limit,
            offset
        })
        const responseObj = {
            result: logDetailList.rows,
            page,
            page_size: pageSize,
            total_count: logDetailList.count
        }

        res.json(responseObj)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchVolatilityList,
    fetchIndividualVolatilityFile,
    fetchColumnMappings,
    updateColumnMapping,
    fetchDashboardDetails,
    fetchLeadLogDetails
}