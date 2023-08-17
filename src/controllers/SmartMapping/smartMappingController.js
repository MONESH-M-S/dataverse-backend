const SmartMappingListModel = require("../../models/SmartMapping/SmartMappingList.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../../enums/statusType.enum");

const fetchSmartMappingList = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const {
      search,
      start_date: startDate,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_category: filterByCategory,
    } = req.query;

    const { provider } = req.params;

    let whereClause = {};

    if (startDate && endDate)
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };

    if (filterByCountry)
      whereClause["Country"] = {
        [Op.in]: [filterByCountry],
      };

    if (filterByProvider)
      whereClause["ExternalDataProvider"] = filterByProvider;

    if (filterByCategory)
      whereClause["Category"] = filterByCategory;

    if (search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } },
        { Country: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    if (provider) {
      whereClause["Dimension"] = provider;
    } else {
      whereClause["Dimension"] = "Product";
    }

    const SummaryList = await SmartMappingListModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: [["id", "DESC"]],
    });

    res.json({ result: SummaryList });
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingListPagination = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const {
      search,
      start_date: startDate,
      filter_by_dimension: filterByDimension,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
    } = req.query;

    const { provider } = req.params

    let whereClause = {};

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
      whereClause["Category"] = filterByCategory;
    }

    if (search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } },
        { Country: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    if (filterByDimension) {
      whereClause["Dimension"] = provider;
    } else {
      whereClause["Dimension"] = "Product";
    }

    const count = await SmartMappingListModel.count({
      limit,
      offset,
      where: whereClause,
      order: ["id", "DESC"],
    });

    const response = {
      page,
      page_size: pageSize,
      total_count: count,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const fetchIndividualSmartMapping = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await SmartMappingListModel.findByPk(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingDashboardCount = async (req, res, next) => {
  try {
    const mappingListCount = await SmartMappingListModel.count();
    const excelFileCount = await SmartMappingListModel.count({
      where: {
        FILENAME: {
          [Op.endsWith]: "xlsx",
        },
      },
    });
    const csvFileCount = await SmartMappingListModel.count({
      where: {
        FILENAME: {
          [Op.endsWith]: "csv",
        },
      },
    });
    const docFileCount = await SmartMappingListModel.count({
      where: {
        FILENAME: {
          [Op.endsWith]: "doc",
        },
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
  } catch (error) {
    next(error);
  }
};


module.exports = {
  fetchSmartMappingList,
  fetchSmartMappingListPagination,
  fetchSmartMappingDashboardCount,
  fetchIndividualSmartMapping
};
