const SmartMappingListModel = require("../../models/SmartMapping/SmartMappingList.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../../enums/statusType.enum");

const FILTER_META = {
  provider: "ExternalDataProvider",
  country: "Country",
  category: "Category",
};

const fetchSmartMappingList = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);

    const {
      filter_by_dimension: filterByDimension,
      filters,
      sorting,
      fileName,
    } = req.query;

    let whereClause = {};
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (Object.keys(tableFilters).length) {
      Object.keys(tableFilters).forEach((filter) => {
        if (filter == "startDate" || filter == "endDate") {
          whereClause["CreatedOn"] = {
            [Op.between]: [tableFilters["startDate"], tableFilters["endDate"]],
          };
        } else {
          whereClause[FILTER_META[filter]] = tableFilters[filter];
        }
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (fileName) {
      whereClause[Op.and] = [
        {
          Filename: {
            [Op.like]: `%${fileName.trim()}%`,
          },
        },
      ];
    }

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      whereClause["Dimension"] = "Product";
    }

    const SummaryList = await SmartMappingListModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    res.json({
      result: SummaryList,
    });
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingListPagination = async (req, res, next) => {
  try {
    const {
      filter_by_dimension: filterByDimension,
      filters,
      fileName,
    } = req.query;

    let whereClause = {};
    let tableFilters = [];

    if (filters) {
      tableFilters = JSON.parse(filters);
    }

    if (Object.keys(tableFilters).length) {
      Object.keys(tableFilters).forEach((filter) => {
        if (filter == "startDate" || filter == "endDate") {
          whereClause["CreatedOn"] = {
            [Op.between]: [tableFilters["startDate"], tableFilters["endDate"]],
          };
        } else {
          whereClause[FILTER_META[filter]] = tableFilters[filter];
        }
      });
    }

    if (fileName) {
      whereClause[Op.and] = [
        {
          Filename: {
            [Op.like]: `%${fileName.trim()}%`,
          },
        },
      ];
    }

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      whereClause["Dimension"] = "Product";
    }

    const count = await SmartMappingListModel.count({
      where: whereClause,
    });

    const response = {
      count: count,
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
  fetchIndividualSmartMapping,
};
