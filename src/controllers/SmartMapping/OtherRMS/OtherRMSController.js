const FactOtherRMSModel = require("../../../models/SmartMapping/OtherRms/FactOtherRMS.model");
const MarketOtherRMSModel = require("../../../models/SmartMapping/OtherRms/MarketOtherRMS.model");
const PeriodOtherRMSModel = require("../../../models/SmartMapping/OtherRms/PeriodOtherRMS.model");

const FactColumns = require("../../../constants/Excel-Columns/SmartMapping/OtherRMS/FactMapped");
const MarketColumns = require("../../../constants/Excel-Columns/SmartMapping/OtherRMS/MarketMapped");
const PeriodColumns = require("../../../constants/Excel-Columns/SmartMapping/OtherRMS/PeriodMapped");

const getPaginationDetails = require("../../../utils/response/getPaginationDetails");
const sendAsExcelFile = require("../../../utils/response/sendAsExcelFile");

const { Op } = require("sequelize");

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
      Search,
      Filename,
      start_date: Startdate,
      filter_by_dimension: Filterbydimension,
      end_date: Enddate,
      filter_by_country: Filterbycountry,
      filter_by_provider: Filterbyprovider,
      filter_by_category: Filterbycategory,
    } = req.query;

    const { limit, offset } = getPaginationDetails(req);

    let whereClause = {
      Filename: Filename,
    };

    if (Search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${Search.trim()}%` } },
        { Category: { [Op.like]: `%${Search.trim()}%` } },
        { Country: { [Op.like]: `%${Search.trim()}%` } },
      ];
    }

    if (Startdate && Enddate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [Startdate, Enddate],
      };
    }

    if (Filterbycountry) {
      whereClause["Country"] = {
        [Op.in]: [Filterbycountry],
      };
    }

    if (Filterbyprovider) {
      whereClause["ExternalDataProvider"] = Filterbyprovider;
    }

    if (Filterbycategory) {
      whereClause["CATEGORY"] = Filterbycategory;
    }

    const model = TABEL_MODEL[Filterbydimension];

    const result = await model.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};

const fetchTableRecordsCount = async (req, res, next) => {
  try {
    const {
      Search,
      Filename,
      start_date: Startdate,
      filter_by_dimension: Filterbydimension,
      end_date: Enddate,
      filter_by_country: Filterbycountry,
      filter_by_provider: Filterbyprovider,
      filter_by_category: Filterbycategory,
    } = req.query;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let whereClause = {
      Filename: Filename,
    };

    if (Search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${Search.trim()}%` } },
        { Category: { [Op.like]: `%${Search.trim()}%` } },
        { Country: { [Op.like]: `%${Search.trim()}%` } },
      ];
    }

    if (Startdate && Enddate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [Startdate, Enddate],
      };
    }

    if (Filterbycountry) {
      whereClause["Country"] = {
        [Op.in]: [Filterbycountry],
      };
    }

    if (Filterbyprovider) {
      whereClause["ExternalDataProvider"] = Filterbyprovider;
    }

    if (Filterbycategory) {
      whereClause["CATEGORY"] = Filterbycategory;
    }

    const model = TABEL_MODEL[Filterbydimension];

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

    const { Filename } = req.query;

    const table = {};

    table.columns = COLUMN_DOWNLOAD_MODEL[type];
    table.model = TABEL_MODEL[type];

    const data = await table.model.findAll({
      where: {
        Filename,
      },
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchTableRecords,
  fetchTableRecordsCount,
  downloadOtherRMSExcel,
};
