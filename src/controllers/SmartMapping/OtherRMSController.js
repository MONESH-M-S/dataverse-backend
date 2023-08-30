const FactOtherRMSModel = require("../../models/SmartMapping/FactOtherRMS.model");
const MarketOtherRMSModel = require("../../models/SmartMapping/MarketOtherRMS.model");
const PeriodOtherRMSModel = require("../../models/SmartMapping/PeriodOtherRMS.model");
const ProductOtherRMSModel = require("../../models/SmartMapping/ProductOtherRMS.model");
const UnprocessedProductOtherRMSModel = require("../../models/SmartMapping/UnprocessedProductOtherRMS.model");

const ProductColumns = require("../../constants/Excel-Columns/SmartMapping/OtherRMS/ProductMapped");
const ProductUnprocessedColumns = require("../../constants/Excel-Columns/SmartMapping/OtherRMS/ProductUnprocessed");
const FactColumns = require("../../constants/Excel-Columns/SmartMapping/OtherRMS/FactMapped");
const MarketColumns = require("../../constants/Excel-Columns/SmartMapping/OtherRMS/MarketMapped");
const PeriodColumns = require("../../constants/Excel-Columns/SmartMapping/OtherRMS/PeriodMapped");

const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const ExcelJS = require("exceljs");
const { Sequelize } = require("../../../models");

const { Op } = require("sequelize");

const dimensionEnum = require("./../../models/enums/dimension.enum");
const confidenceLevelEnum = require("./../../enums/confidenceLevel.enum");

const TABEL_MODEL = {
  Fact: FactOtherRMSModel,
  Market: MarketOtherRMSModel,
  Period: PeriodOtherRMSModel,
};

const COLUMN_DOWNLOAD_MODEL = {
  Fact: FactColumns,
  Market: MarketColumns,
  Period: PeriodColumns,
};

const fetchTableRecords = async (req, res, next) => {
  try {
    const {
      search,
      Filename,
      orderKey,
      orderValue,
      start_date: startDate,
      filter_by_dimension: filterByDimension,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
      confidenceLevel,
    } = req.query;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let orderClause = [];

    if (orderKey || orderValue) {
      orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
    }

    let whereClause = {
      Filename: Filename,
    };

    if (search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } },
        { Country: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    if (startDate && endDate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (filterByCountry) {
      whereClause["Country"] = {
        [Op.in]: [filterByCountry],
      };
    }

    if (filterByProvider) {
      whereClause["ExternalDataProvider"] = filterByProvider;
    }

    if (filterByCategory) {
      whereClause["CATEGORY"] = filterByCategory;
    }

    let model;

    if (filterByDimension === dimensionEnum.product) {
      if (
        confidenceLevel &&
        confidenceLevel === confidenceLevelEnum.UNPROCESSED
      )
        model = UnprocessedProductOtherRMSModel;
      else {
        if (confidenceLevel) whereClause["ConfidenceLevel"] = confidenceLevel;
        model = ProductOtherRMSModel;
      }
    } else model = TABEL_MODEL[filterByDimension];

    const result = await model.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ result });
  } catch (error) {
    next(error);
  }
};

const fetchTableRecordsCount = async (req, res, next) => {
  try {
    const {
      search,
      Filename,
      orderKey,
      orderValue,
      start_date: startDate,
      filter_by_dimension: filterByDimension,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
      confidenceLevel,
    } = req.query;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let orderClause = [];

    if (orderKey || orderValue) {
      orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
    }

    let whereClause = {
      Filename: Filename,
    };

    if (search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } },
        { Country: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    if (startDate && endDate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (filterByCountry) {
      whereClause["Country"] = {
        [Op.in]: [filterByCountry],
      };
    }

    if (filterByProvider) {
      whereClause["ExternalDataProvider"] = filterByProvider;
    }

    if (filterByCategory) {
      whereClause["CATEGORY"] = filterByCategory;
    }

    let model;

    if (filterByDimension === dimensionEnum.product) {
      if (
        confidenceLevel &&
        confidenceLevel === confidenceLevelEnum.UNPROCESSED
      )
        model = UnprocessedProductOtherRMSModel;
      else {
        if (confidenceLevel) whereClause["ConfidenceLevel"] = confidenceLevel;
        model = ProductOtherRMSModel;
      }
    } else model = TABEL_MODEL[filterByDimension];

    const result = await model.count({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ page, page_size: pageSize, total_count: result });
  } catch (error) {
    next(error);
  }
};

const downloadOtherRMSExcel = async (req, res, next) => {
  try {
    const type = req.params.type;
    const { Filename, confidenceLevel } = req.query;
    let columns;
    let table;
    if (type === dimensionEnum.product) {
      if (confidenceLevel === confidenceLevelEnum.UNPROCESSED) {
        columns = ProductUnprocessedColumns;
        table = UnprocessedProductOtherRMSModel;
      } else {
        columns = ProductColumns;
        table = ProductOtherRMSModel;
      }
    } else {
      columns = COLUMN_DOWNLOAD_MODEL[type];
      table = TABEL_MODEL[type];
    }

    const data = await table.findAll({
      where: {
        Filename,
      },
    });

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
    res.setHeader("Content-Disposition", "attachment; filename=" + Filename);

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchTableRecords,
  fetchTableRecordsCount,
  downloadOtherRMSExcel,
};
