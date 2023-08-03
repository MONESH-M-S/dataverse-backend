const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const LoadLogModel = require("../models/loadLog.model");
const statusTypeEnum = require("../enums/statusType.enum");
const LoadLogDetailModel = require("../models/loadLogDetail.model");
const { Sequelize } = require("../../models");
const sequelize = require("../config/sequelize.config");
const fileVolatilityFilterEnum = require("../enums/fileVolatilityFilter.enum");
const FactColumnMappingModel = require("../models/ColumnMappingV3.model");
const fileVolatilityColumns = require("./../constants/columns/fileVolatilityColumns");
const ExcelJS = require("exceljs");

const fetchVolatilityList = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);
    const {
      search,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
      filter_by_country: filterByCountry,
      start_date: startDate,
      end_date: endDate,
      filter_by_fail: filterByFail,
      filter_by_in_progress: filterByInProgress,
      filter_by_success: filterBySuccess,
      order_by_id: orderById,
      order_by_provider: orderByProvider,
    } = req.query;

    let whereClause = {};
    let orderClause = [["LogId", "DESC"]];

    if (filterByProvider) {
      whereClause["SOURCE"] = filterByProvider;
    } else {
      whereClause["SOURCE"] = { [Op.in]: ["Nielsen", "POS"] };
    }

    if (startDate && endDate) {
      whereClause["LOADSTARTTIME"] = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (filterByCategory) {
      whereClause["CATEGORY"] = filterByCategory;
    }

    if (search) {
      whereClause[Op.or] = [
        { FILENAME: { [Op.like]: `%${search.trim()}%` } },
        { COUNTRY: { [Op.like]: `%${search.trim()}%` } },
        { CATEGORY: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const statusFilterList = [];

    if (filterByFail && filterByFail != "false") {
      statusFilterList.push(fileVolatilityFilterEnum.FAILURE);
    }

    if (filterByInProgress && filterByInProgress != "false") {
      statusFilterList.push(fileVolatilityFilterEnum.IN_PROGRESS);
    }

    if (filterBySuccess && filterBySuccess != "false") {
      statusFilterList.push(fileVolatilityFilterEnum.SUCCESS);
    }

    if (statusFilterList.length > 0) {
      whereClause["PIPELINESTATUS"] = {
        [Op.in]: statusFilterList,
      };
    }

    if (filterByCountry) {
      whereClause["COUNTRY"] = {
        [Op.in]: [filterByCountry],
      };
    }

    if (orderById) {
      orderClause = [["LogId", orderById]];
    }

    if (orderByProvider) {
      orderClause = [["SOURCE", orderByProvider]];
    }

    const volatilityList = await LoadLogModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      result: volatilityList,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchVolatilityListPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);
    const {
      search,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
      filter_by_country: filterByCountry,
      start_date: startDate,
      end_date: endDate,
      filter_by_fail: filterByFail,
      filter_by_in_progress: filterByInProgress,
      filter_by_success: filterBySuccess,
      order_by_id: orderById,
      order_by_provider: orderByProvider,
    } = req.query;

    let whereClause = {};
    let orderClause = [["LogId", "DESC"]];

    if (filterByProvider) {
      whereClause["SOURCE"] = filterByProvider;
    } else {
      whereClause["SOURCE"] = { [Op.in]: ["Nielsen", "POS"] };
    }

    if (startDate && endDate) {
      whereClause["LOADSTARTTIME"] = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (filterByCategory) {
      whereClause["CATEGORY"] = filterByCategory;
    }

    if (search) {
      whereClause[Op.or] = [
        { FILENAME: { [Op.like]: `%${search.trim()}%` } },
        { COUNTRY: { [Op.like]: `%${search.trim()}%` } },
        { CATEGORY: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const statusFilterList = [];

    if (filterByFail && filterByFail != "false") {
      statusFilterList.push(fileVolatilityFilterEnum.FAILURE);
    }

    if (filterByInProgress && filterByInProgress != "false") {
      statusFilterList.push(fileVolatilityFilterEnum.IN_PROGRESS);
    }

    if (filterBySuccess && filterBySuccess != "false") {
      statusFilterList.push(fileVolatilityFilterEnum.SUCCESS);
    }

    if (statusFilterList.length > 0) {
      whereClause["PIPELINESTATUS"] = {
        [Op.in]: statusFilterList,
      };
    }

    if (filterByCountry) {
      whereClause["COUNTRY"] = {
        [Op.in]: [filterByCountry],
      };
    }

    if (orderById) {
      orderClause = [["LogId", orderById]];
    }

    if (orderByProvider) {
      orderClause = [["SOURCE", orderByProvider]];
    }

    const volatilityListCount = await LoadLogModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: volatilityListCount,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchIndividualVolatilityFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await LoadLogModel.findByPk(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const fetchColumnMappings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { entity } = req.query;

    const logDetails = await LoadLogModel.findByPk(id);
    
    let Entity = entity ?? "Product";
    
    const fileData = await sequelize.query(`
    SELECT 
  q1.Id, 
  q1.ZipFileName, 
  q1.FileName, 
  q1.Country, 
  q1.Category, 
  q1.Entity, 
  q1.SourceColumnList, 
  COALESCE(q1.SourceColumn, 'NA') AS SourceColumn, 
  COALESCE(q1.TargetColumn, 'NA') AS TargetColumn, 
  COALESCE(
    q1.CriticalAttributes_Flag, 'NA'
  ) AS CriticalAttributes_Flag, 
  ISNULL(p.PreviousSource, 'NA') AS PreviousSource, 
  q1.DataProvider, 
  q1.Missing_Critical_Attribute_Values 
FROM 
  (
    SELECT 
      A.Id, 
      A.ZipFileName, 
      A.FileName, 
      A.Country, 
      A.Category, 
      A.Entity, 
      A.SourceColumnList, 
      A.SourceColumn, 
      A.TargetColumn, 
      A.CriticalAttributes_Flag, 
      A.DataProvider, 
      D.Missing_Critical_Attribute_Values 
    FROM 
      [metadata].[ColumnMapping] A 
      LEFT JOIN (
        SELECT 
          C.[ZipFileName], 
          C.[Entity], 
          CASE WHEN COUNT(*) > 1 THEN STRING_AGG(
            TRIM(
              C.Missing_Critical_Attribute_Value
            ), 
            '|'
          ) ELSE MAX(
            TRIM(
              C.Missing_Critical_Attribute_Value
            )
          ) END AS Missing_Critical_Attribute_Values 
        FROM 
          (
            SELECT 
              [ZipFileName], 
              C.[FileName], 
              [Country], 
              [Category], 
              [MarketNameCode], 
              C.[Entity], 
              [DataProvider], 
              TRIM(
                E.Missing_Critical_Attribute_Value
              ) AS Missing_Critical_Attribute_Value 
            FROM 
              [metadata].[ColumnMapping] C 
              INNER JOIN (
                SELECT 
                  DISTINCT [FileName], 
                  [TaskName], 
                  TRIM(
                    [Missing_Critical_Attribute_Value]
                  ) AS Missing_Critical_Attribute_Value, 
                  TRIM([filename_new]) AS filename_new 
                FROM 
                  (
                    SELECT 
                      [FileName], 
                      [TaskName], 
                      [MessageType], 
                      [LogMessage], 
                      [value] AS Missing_Critical_Attribute_Value, 
                      CASE WHEN [MessageType] LIKE '%Error%' THEN REPLACE([MessageType], 'Error', '') ELSE [MessageType] END AS filename_new 
                    FROM 
                      [info].[LoadDetailLog] CROSS APPLY STRING_SPLIT(
                        REPLACE(
                          REPLACE(
                            [LogMessage], 'Missing Critical Attributes:', 
                            ''
                          ), 
                          'Missing Critical Attributes', 
                          ''
                        ), 
                        ','
                      ) 
                    WHERE 
                      [TaskName] LIKE '%Critical Attributes%' 
                      AND [LogMessage] LIKE '%Missing%'
                  ) AS D
              ) AS E ON C.FileName = E.filename_new
          ) AS C 
        GROUP BY 
          [ZipFileName], 
          [Entity]
      ) AS D ON A.ZipFileName = D.ZipFileName 
      AND A.Entity = D.Entity
  ) q1 
  LEFT JOIN (
    SELECT 
      [ZipFileName], 
      [Entity], 
      ISNULL(
        STRING_AGG([SourceColumn], '|') WITHIN GROUP (
          ORDER BY 
            [LoadDate] DESC
        ), 
        'NA'
      ) AS PreviousSource 
    FROM 
      [metadata].[ColumnMapping] 
    GROUP BY 
      [ZipFileName], 
      [Entity]
  ) p ON q1.ZipFileName = p.ZipFileName 
  AND q1.Entity = p.Entity and
    ZipFileName = '${logDetails.FILENAME}'
    and Entity = '${Entity}`);
    
    if (fileData === null) {
      res.json({});
      return;
    }

    res.json(fileData[0][0]);
  } catch (error) {
    next(error);
  }
};

const updateColumnMapping = async (req, res) => {
  try {
    const { SourceColumn, Id, criticalAttributes } = req.body;

    await FactColumnMappingModel.update(
      {
        SourceColumn,
        CriticalAttributes_Flag: criticalAttributes,
      },
      {
        where: {
          Id,
        },
      }
    );

    res.json({
      message: "Successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

const fetchDashboardDetails = async (req, res) => {
  const totalCount = await LoadLogModel.count();
  // Added raw queries as these will be easier to fetch the data
  // instead of writing multiple sub queires in sequeileize

  const csvCountQuery =
    "SELECT " +
    "    COUNT(spl.value) AS count " +
    "FROM " +
    "    (SELECT RIGHT(LogMessage, CHARINDEX(' ', REVERSE(LogMessage)) -1) as Extract_List " +
    "        FROM info.LoadDetailLog " +
    "    WHERE    LogMessage like '%.% %' " +
    "            AND TaskName='Extract_zip' " +
    "    )ext_list " +
    "CROSS APPLY STRING_SPLIT(ext_list.Extract_List, '|') spl " +
    "WHERE spl.value like '%.csv'";

  const excelCountQuery =
    "SELECT " +
    "    COUNT(spl.value) AS count " +
    "FROM " +
    "    (SELECT RIGHT(LogMessage, CHARINDEX(' ', REVERSE(LogMessage)) -1) as Extract_List " +
    "        FROM info.LoadDetailLog " +
    "    WHERE    LogMessage like '%.% %' " +
    "            AND TaskName='Extract_zip' " +
    "    )ext_list " +
    "CROSS APPLY STRING_SPLIT(ext_list.Extract_List, '|') spl " +
    "WHERE spl.value like '%.xlsx'";

  const docCountQuery =
    "SELECT " +
    "    COUNT(spl.value) AS count " +
    "FROM " +
    "    (SELECT RIGHT(LogMessage, CHARINDEX(' ', REVERSE(LogMessage)) -1) as Extract_List " +
    "        FROM info.LoadDetailLog " +
    "    WHERE    LogMessage like '%.% %' " +
    "            AND TaskName='Extract_zip' " +
    "    )ext_list " +
    "CROSS APPLY STRING_SPLIT(ext_list.Extract_List, '|') spl " +
    "WHERE spl.value like '%.doc' or spl.value like '%.docx'";

  const csvCount = await sequelize.query(csvCountQuery, {
    type: Sequelize.QueryTypes.SELECT,
  });
  const excelCount = await sequelize.query(excelCountQuery, {
    type: Sequelize.QueryTypes.SELECT,
  });
  const docCount = await sequelize.query(docCountQuery, {
    type: Sequelize.QueryTypes.SELECT,
  });

  res.json({
    status: statusTypeEnum.success,
    data: {
      csv_count: csvCount[0].count,
      excel_count: excelCount[0].count,
      doc_count: docCount[0].count,
      total_count: totalCount,
    },
  });
};

const fetchLeadLogDetails = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const { id } = req.params;
    const logDetailList = await LoadLogDetailModel.findAndCountAll({
      where: {
        LogId: id,
      },
      limit,
      offset,
    });
    const responseObj = {
      result: logDetailList.rows,
      page,
      page_size: pageSize,
      total_count: logDetailList.count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const addTargetColumn = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { source, target } = req.body;

    await FactColumnMappingModel.update(
      {
        SourceColumn: source,
        TargetColumn: target,
      },
      {
        where: {
          Id: id,
        },
      }
    );

    res.json({
      staus: "Success",
      message: "Successfully updated the mappings",
    });
  } catch (error) {
    next(error);
  }
};

const downloadVolatilityList = async (req, res, next) => {
  try {
    const { ids } = req.query;

    console.log(ids);
    const data = await LoadLogModel.findAll({
      where: {
        LogId: {
          [Op.in]: ids,
        },
      },
    });
    console.log(data);

    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet("");

    worksheet.columns = fileVolatilityColumns;

    data.forEach((item) => {
      worksheet.addRow(item.toJSON());
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchVolatilityList,
  fetchVolatilityListPagination,
  fetchIndividualVolatilityFile,
  fetchColumnMappings,
  updateColumnMapping,
  fetchDashboardDetails,
  fetchLeadLogDetails,
  addTargetColumn,
  downloadVolatilityList,
};
