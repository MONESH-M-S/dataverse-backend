const { Sequelize } = require("../../models");
const sequelize = require("../config/sequelize.config");
const dqCheckStatusEnum = require("../enums/dqCheckStatus.enum");
const DQCheckModel = require("../models/DQCheck.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");

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
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const whereClause = getFiltersForDQChecks(req);

    const data = await DQCheckModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      result: data,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchDQChecksDataCount = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const whereClause = getFiltersForDQChecks(req);

    const data = await DQCheckModel.findAndCountAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: data.count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchDQCountryMeta = async (req, res, next) => {
  try {
    const data = await DQCheckModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Country")), "name"],
      ],
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const fetchDQCategoryMeta = async (req, res, next) => {
  try {
    const data = await DQCheckModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Category")), "name"],
      ],
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const downloadDQCheckReport = async (req, res, next) => {
  const whereClause = getFiltersForDQChecks(req);
  const data = await DQCheckModel.findAll({
    where: whereClause,
  });

  const columns = [
    { header: "Country", key: "Country", width: 20 },
    { header: "Category", key: "Category", width: 20 },
    { header: "Cell Database", key: "CellDatabase", width: 20 },
    { header: "File Name", key: "zipFile", width: 40 },
    { header: "Overall Status", key: "Overall_Status", width: 20 },
    {
      header: "Checks Passed",
      key: "Number_of_files_that_passed_Check",
      width: 20,
    },
    {
      header: "Checks Failed",
      key: "Number_of_files_that_failed_Check",
      width: 20,
    },
    { header: "Remarks", key: "Remarks", width: 40 },
  ];

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("");

  worksheet.columns = columns;

  data.forEach((item) => {
    worksheet.addRow(item.toJSON());
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
};

module.exports = {
  fetchSummaryStatus,
  fetchDQChecksData,
  fetchDQCategoryMeta,
  fetchDQCountryMeta,
  downloadDQCheckReport,
  fetchDQChecksDataCount,
};
