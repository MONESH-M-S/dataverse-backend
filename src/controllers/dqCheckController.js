const {
  Sequelize
} = require("../../models");
const sequelize = require("../config/sequelize.config");
const dqCheckStatusEnum = require("../enums/dqCheckStatus.enum");
const DQCheckModel = require("../models/DQCheck.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const {
  Op
} = require("sequelize");
const ExcelJS = require("exceljs");
const dqCardStatsQuery = require("../constants/dq-checks/dqCardStatsQuery");

const fetchDQCardStats = async (req, res, next) => {
  const stat = req.params.stats;
  try {
    const result = await sequelize.query(dqCardStatsQuery[stat], {
      type: Sequelize.QueryTypes.SELECT,
    });
    res.json({
      result: result[0],
    });
  } catch (error) {
    next(error);
  }
};

// Added raw queries as these will be easier to fetch the data instead of writing multiple sub queires in sequeileize
const fetchSummaryStatus = async (req, res, next) => {
  try {
    const totalCellRawQuery =
      "select count(distinct  Filename) as count \n" +
      "FROM [info].[LoadDetailLog]\n" +
      "Where TaskName in ('NumberoFilesCheck','FileSizeCheck','FileNameCheck','FileDelimiterCheck',\n" +
      "'FileEncodingCheck','ConstraintCheck','LastPeriodDeliveredCheck','DimvsTransTagsCheck','SchemaCheck');\n";

    const totalFileCountQuery =
      "select  sum((LEN(LogMessage) - LEN(REPLACE(LogMessage,'|',''))) + 1) AS TotalFiles\n" +
      "FROM [info].[LoadDetailLog]\n" +
      "Where TaskName in ('FileNameCheck')\n" +
      "AND LogMessage like '%|%';\n";

    const successStatusQuery =
      "SELECT (SUM(CASE WHEN Overall_Status = 'Success' THEN 1 ELSE 0 END) * 1.0 / COUNT(*)) AS Success_Rate\n" +
      "FROM\n" +
      "(\n" +
      "SELECT *,\n" +
      "CASE WHEN x.Failure_count = 0 THEN 'Success' ELSE 'Failure' END AS Overall_Status\n" +
      "FROM\n" +
      "(\n" +
      "SELECT MessageType,\n" +
      "TaskName,\n" +
      "(LEN(MessageType) - LEN(REPLACE(MessageType, 'Success', ''))) / 7 AS Success_count,\n" +
      "(LEN(MessageType) - LEN(REPLACE(MessageType, 'Error', ''))) / 5 AS Failure_count\n" +
      "FROM [info].[LoadDetailLog]\n" +
      "WHERE TaskName IN ('NumberoFilesCheck','FileSizeCheck','FileNameCheck','FileDelimiterCheck','FileEncodingCheck','ConstraintCheck','LastPeriodDeliveredCheck','DimvsTransTagsCheck','SchemaCheck')\n" +
      ") x\n" +
      ") y\n";

    const totalCellCount = await sequelize.query(totalCellRawQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });
    const totalFilesCount = await sequelize.query(totalFileCountQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });
    const successStatusData = await sequelize.query(successStatusQuery, {
      type: Sequelize.QueryTypes.SELECT,
    });

    res.json({
      cell_count: totalCellCount[0].count,
      files_count: totalFilesCount[0].TotalFiles,
      success_status: successStatusData[0].Success_Rate * 100,
    });
  } catch (error) {
    next(error);
  }
};

const getFiltersForDQChecks = (req) => {
  const {
    filter_by_category: filterByCategory,
    filter_by_country: filterByCountry,
    filter_by_in_success: filterBySuccess,
    filter_by_in_failure: filterByFailure,
    filter_by_in_progress: filterByInProgress,
  } = req.query;

  let whereClause = {};
  let statusFilterList = [];

  if (filterByCategory) {
    whereClause["Category"] = filterByCategory;
  }

  if (filterByCountry) {
    whereClause["Country"] = filterByCountry;
  }

  if (filterBySuccess && filterBySuccess != "false") {
    statusFilterList.push(dqCheckStatusEnum.SUCCESS);
  }
  if (filterByFailure && filterByFailure != "false") {
    statusFilterList.push(dqCheckStatusEnum.FAILURE);
  }
  if (filterByInProgress && filterByInProgress != "false") {
    statusFilterList.push(dqCheckStatusEnum.IN_PROGRESS);
  }

  if (statusFilterList.length > 0) {
    whereClause["Overall_Status"] = {
      [Op.in]: statusFilterList,
    };
  }

  return whereClause;
};

const fetchDQChecksData = async (req, res, next) => {
  try {
    const {
      limit,
      offset,
      page,
      pageSize
    } = getPaginationDetails(req);

    let query = "";
    let metaDataFilter = [];
    let statusFilter = [];

    if (req.query.filter_by_country)
      metaDataFilter.push(`Country = '${req.query.filter_by_country}'`);

    if (req.query.filter_by_delivery_period)
      metaDataFilter.push(
        `DeliveryPeriod = '${req.query.filter_by_delivery_period}'`
      );

    if (req.query.filter_by_provider)
      metaDataFilter.push(`Source = '${req.query.filter_by_provider}'`);

    if (req.query.filter_by_category)
      metaDataFilter.push(`Category = '${req.query.filter_by_category}'`);

    if (req.query.filter_by_dataset)
      metaDataFilter.push(`Dataset = '${req.query.filter_by_dataset}'`)

    if (req.query.filter_by_in_success === "true")
      statusFilter.push(`'Success'`);

    if (req.query.filter_by_in_failure === "true")
      statusFilter.push(`'Failure'`);

    if (req.query.filter_by_in_progress === "true")
      statusFilter.push(`'In Progress'`);

    if (metaDataFilter.length || statusFilter.length) {
      query = "WHERE ";

      if (metaDataFilter.length) {
        query += metaDataFilter.join(" AND ");
      }

      if (statusFilter.length) {
        if (metaDataFilter.length) {
          query += " AND ";
        }
        query += `Overall_Status IN (${statusFilter.join(",")})`;
      }
    }

    const data = await sequelize.query(`
    DECLARE @LatestFileRunLoadLog TABLE (
      LogId INT, 
      LoadDesc NVARCHAR(100), 
      LoadStartTime Datetime, 
      FileName Nvarchar(100), 
      Source Nvarchar(100), 
      Country Nvarchar(100), 
      Category Nvarchar(100), 
      Dataset Nvarchar(100), 
      DirectIndirect Nvarchar(100), 
      Expected Nvarchar(100)
    );
    INSERT INTO @LatestFileRunLoadLog EXEC [info].[spGetLatestFileRunLoadLogs];
    WITH CTE AS(
      SELECT 
        Dataset, 
        DirectIndirect, 
        Source, 
        base.FileName, 
        Country, 
        Category, 
        LoadStartTime, 
        SUM(
          LEN(MessageType) - LEN(
            REPLACE(MessageType, 'Success', '')
          )
        ) / 7 AS Checks_Passed, 
        SUM(
          LEN(MessageType) - LEN(
            REPLACE(MessageType, 'Error', '')
          )
        ) / 5 AS Checks_Failed, 
        STRING_AGG(MessageType, '|') AS Remarks 
      FROM 
        @LatestFileRunLoadLog base 
        Join info.LoadDetailLog A ON A.LogId = base.LogId 
      WHERE 
        A.TaskName IN (
          'NumberoFilesCheck', 'FileSizeCheck', 
          'FileNameCheck', 'FileDelimiterCheck', 
          'FileEncodingCheck', 'ConstraintCheck', 
          'LastPeriodDeliveredCheck', 'DimvsTransTagsCheck', 
          'SchemaCheck', 'POS_check_null_values', 
          'POS_check_duplicate_values', 'POS_check_data_type'
        ) 
        and MessageType LIKE '%:%:%:%:%' 
      GROUP BY 
        base.Country, 
        base.Category, 
        Source, 
        base.FileName, 
        LoadStartTime, 
        Dataset, 
        DirectIndirect
    ) 
    Select 
      Dataset, 
      DirectIndirect, 
      Source AS DataProvider, 
      FileName AS zipFile, 
      Country, 
      Category AS ExternalCategory, 
      Country + ' ' + Category AS CellDatabase, 
      DATENAME(MONTH, LoadStartTime) + '-' + CAST(
        YEAR(LoadStartTime) AS VARCHAR(10)
      ) AS DeliveryPeriod, 
      CASE WHEN (Checks_Failed)= 0 THEN 'Success' ELSE 'Failure' END AS Overall_Status, 
      Checks_Passed, 
      Checks_Failed, 
      Remarks 
    from 
      CTE ${query}
    ORDER BY FileName offset ${offset} rows fetch next ${limit} rows only 
    
  `);

    const responseObj = {
      result: data[0],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchDQChecksDataCount = async (req, res, next) => {
  try {
    const {
      limit,
      offset,
      page,
      pageSize
    } = getPaginationDetails(req);

    let query = "";
    let metaDataFilter = [];
    let statusFilter = [];

    if (req.query.filter_by_country)
      metaDataFilter.push(`Country = '${req.query.filter_by_country}'`);

    if (req.query.filter_by_delivery_period)
      metaDataFilter.push(
        `DeliveryPeriod = '${req.query.filter_by_delivery_period}'`
      );

    if (req.query.filter_by_category)
      metaDataFilter.push(`Category = '${req.query.filter_by_category}'`);

    if (req.query.filter_by_dataset)
      metaDataFilter.push(`Dataset = '${req.query.filter_by_dataset}'`)


    if (req.query.filter_by_in_success === "true")
      statusFilter.push(`'Success'`);

    if (req.query.filter_by_in_failure === "true")
      statusFilter.push(`'Failure'`);

    if (req.query.filter_by_in_progress === "true")
      statusFilter.push(`'In Progress'`);

    if (metaDataFilter.length || statusFilter.length) {
      query = "WHERE ";

      if (metaDataFilter.length) {
        query += metaDataFilter.join(" AND ");
      }

      if (statusFilter.length) {
        if (metaDataFilter.length) {
          query += " AND ";
        }
        query += `Overall_Status IN (${statusFilter.join(",")})`;
      }
    }


    const data = await sequelize.query(`
    DECLARE @LatestFileRunLoadLog TABLE (
  LogId INT, 
  LoadDesc NVARCHAR(100), 
  LoadStartTime Datetime, 
  FileName Nvarchar(100), 
  Source Nvarchar(100), 
  Country Nvarchar(100), 
  Category Nvarchar(100), 
  Dataset Nvarchar(100), 
  DirectIndirect Nvarchar(100), 
  Expected Nvarchar(100)
);
INSERT INTO @LatestFileRunLoadLog EXEC [info].[spGetLatestFileRunLoadLogs];
WITH CTE AS(
  SELECT 
    Dataset, 
    DirectIndirect, 
    Source, 
    base.FileName, 
    Country, 
    Category, 
    LoadStartTime, 
    SUM(
      LEN(MessageType) - LEN(
        REPLACE(MessageType, 'Success', '')
      )
    ) / 7 AS Checks_Passed, 
    SUM(
      LEN(MessageType) - LEN(
        REPLACE(MessageType, 'Error', '')
      )
    ) / 5 AS Checks_Failed, 
    STRING_AGG(MessageType, '|') AS Remarks 
  FROM 
    @LatestFileRunLoadLog base 
    Join info.LoadDetailLog A ON A.LogId = base.LogId 
  WHERE 
    A.TaskName IN (
      'NumberoFilesCheck', 'FileSizeCheck', 
      'FileNameCheck', 'FileDelimiterCheck', 
      'FileEncodingCheck', 'ConstraintCheck', 
      'LastPeriodDeliveredCheck', 'DimvsTransTagsCheck', 
      'SchemaCheck', 'POS_check_null_values', 
      'POS_check_duplicate_values', 'POS_check_data_type'
    ) 
    and MessageType LIKE '%:%:%:%:%' 
  GROUP BY 
    base.Country, 
    base.Category, 
    Source, 
    base.FileName, 
    LoadStartTime, 
    Dataset, 
    DirectIndirect
) 
Select 
  count(*) as count 
from 
  CTE ${query}

  `);

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: data[0][0].count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadDQCheckReport = async (req, res, next) => {
  try {

    const data = await sequelize.query(`
    DECLARE @LatestFileRunLoadLog TABLE (
      LogId INT, 
      LoadDesc NVARCHAR(100), 
      LoadStartTime Datetime, 
      FileName Nvarchar(100), 
      Source Nvarchar(100), 
      Country Nvarchar(100), 
      Category Nvarchar(100), 
      Dataset Nvarchar(100), 
      DirectIndirect Nvarchar(100), 
      Expected Nvarchar(100)
    );
    INSERT INTO @LatestFileRunLoadLog EXEC [info].[spGetLatestFileRunLoadLogs];
    WITH CTE AS(
      SELECT 
        Dataset, 
        DirectIndirect, 
        Source, 
        Country, 
        Category, 
        base.FileName, 
        Expected, 
        LoadStartTime, 
        TaskName, 
        REPLACE(MessageType, '(|)', '(#)') as MessageType 
      FROM 
        @LatestFileRunLoadLog base 
        Join info.LoadDetailLog A ON A.LogId = base.LogId 
      WHERE 
        A.TaskName IN (
          'NumberoFilesCheck', 'FileSizeCheck', 
          'FileNameCheck', 'FileDelimiterCheck', 
          'FileEncodingCheck', 'ConstraintCheck', 
          'LastPeriodDeliveredCheck', 'DimvsTransTagsCheck', 
          'SchemaCheck', 'POS_check_null_values', 
          'POS_check_duplicate_values', 'POS_check_data_type'
        ) 
        and MessageType LIKE '%:%:%:%:%' 
      GROUP BY 
        base.Country, 
        base.Category, 
        Source, 
        base.FileName, 
        Expected, 
        LoadStartTime, 
        Dataset, 
        DirectIndirect, 
        TaskName, 
        MessageType
    ) 
    Select 
      Dataset, 
      DirectIndirect AS DataProviderType, 
      Source AS DataProvider, 
      Country, 
      Category AS ExternalCategory, 
      Country + ' ' + Category AS CellDatabase, 
      CASE WHEN value like '%MKT%' THEN 'Market' WHEN value like '%PER%' THEN 'Period' WHEN value like '%PROD%' THEN 'Product' WHEN value like '%FCT%' THEN 'Fact' WHEN value like '%DIM%' THEN 'Dimension' WHEN value like '%fact_data%' THEN 'fact_data' WHEN value like '%meta_data%' THEN 'meta_data' END AS Dimension, 
      SUBSTRING(
        value, 
        CHARINDEX(':', value) + 1, 
        CHARINDEX(
          ':', 
          value, 
          CHARINDEX(':', value) + 1
        ) - CHARINDEX(':', value)
      ) AS FileNames, 
      Expected AS ExpectedDeliveredDate, 
      TaskName, 
      SUBSTRING(
        REPLACE(value, '(#)', '(|)'), 
        CHARINDEX(
          ':', 
          REPLACE(value, '(#)', '(|)'), 
          CHARINDEX(
            ':', 
            REPLACE(value, '(#)', '(|)'), 
            CHARINDEX(
              ':', 
              REPLACE(value, '(#)', '(|)'), 
              CHARINDEX(
                ':', 
                REPLACE(value, '(#)', '(|)')
              ) + 1
            ) + 1
          ) + 1
        ) + 1, 
        LEN(
          REPLACE(value, '(#)', '(|)')
        )
      ) AS Description, 
      CASE WHEN value like '%Succes%' THEN 'Success' WHEN value like '%Error%' THEN 'Failure' END AS Check_Status, 
      DATENAME(MONTH, LoadStartTime) + '-' + CAST(
        YEAR(LoadStartTime) AS VARCHAR(10)
      ) AS UpdatedOn 
    from 
      CTE CROSS APPLY STRING_SPLIT(MessageType, '|')    
    `);

    const columns = [
      {
        header: "Dataset",
        key: "Dateset",
        width: 30
      },
      {
        header: "DataProviderType",
        key: "DataProviderType",
        width: 30
      },
      {
        header: "DataProvider",
        key: "DataProvider",
        width: 30
      },
      {
        header: "Country",
        key: "Country",
        width: 30
      },
      {
        header: "ExternalCategory",
        key: "ExternalCategory",
        width: 30
      },
      {
        header: "CellDatabase",
        key: "CellDatabase",
        width: 30
      },
      {
        header: "Dimension",
        key: "Dimension",
        width: 20
      },
      {
        header: "File Names",
        key: "FileNames",
        width: 50,
      },
      {
        header: "Expected Delivered Date",
        key: "ExpectedDeliveredDate",
        width: 30,
      },
      {
        header: "TaskName",
        key: "TaskName",
        width: 30
      },
      {
        header: "Description",
        key: "Description",
        width: 40
      },
      {
        header: "Check Status",
        key: "Check_Status",
        width: 40
      },
      {
        header: "Updated On",
        key: "UpdatedOn",
        width: 40
      },
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("");

    worksheet.columns = columns;

    data[0].forEach((item) => {
      worksheet.addRow(item);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=File Volatility Checks.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    next(error);
  }
};




module.exports = {
  fetchSummaryStatus,
  fetchDQChecksData,
  downloadDQCheckReport,
  fetchDQChecksDataCount,
  fetchDQCardStats,
};