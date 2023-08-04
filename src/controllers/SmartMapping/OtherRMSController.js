const FactOtherRMSModel = require("../../models/SmartMapping/FactOtherRMS.model");
const MarketOtherRMSModel = require("../../models/SmartMapping/MarketOtherRMS.model");
const PeriodOtherRMSModel = require("../../models/SmartMapping/PeriodOtherRMS.model");

const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const { Sequelize } = require("../../../models");

const { Op } = require("sequelize");

const TABEL_MODEL = {
  Fact: FactOtherRMSModel,
  Market: MarketOtherRMSModel,
  Period: PeriodOtherRMSModel,
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

    const model = TABEL_MODEL[filterByDimension];

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

    const model = TABEL_MODEL[filterByDimension];

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

module.exports = {
  fetchTableRecords,
  fetchTableRecordsCount,
};
