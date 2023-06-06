const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const LoadLogModel = require("../models/loadLog.model");
const statusTypeEnum = require("../enums/statusType.enum");
const LoadLogDetailModel = require("../models/loadLogDetail.model");
const { Sequelize } = require("../../models");
const sequelize = require("../config/sequelize.config");
const fileVolatilityFilterEnum = require("../enums/fileVolatilityFilter.enum");
const FactColumnMappingModel = require("../models/ColumnMappingV3.model");

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

    const fileData = await FactColumnMappingModel.findOne({
      where: {
        ZipFileName: logDetails.FILENAME,
        Entity: entity ?? "Product",
      },
    });

    if (fileData === null) {
      res.json({});
      return;
    }

    res.json(fileData);
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

module.exports = {
  fetchVolatilityList,
  fetchVolatilityListPagination,
  fetchIndividualVolatilityFile,
  fetchColumnMappings,
  updateColumnMapping,
  fetchDashboardDetails,
  fetchLeadLogDetails,
  addTargetColumn,
};
