const SmartMappingListModel = require("../../models/SmartMapping/SmartMappingList.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const {
  Op
} = require("sequelize");
const statusTypeEnum = require("../../enums/statusType.enum");

const fetchSmartMappingList = async (req, res, next) => {
  try {
    const {
      limit,
      offset
    } = getPaginationDetails(req);


    const {
      search,
      start_date: startDate,
      end_date: endDate,
      filter_by_dimension: filterByDimension,
      filters,
      sorting
    } = req.query;


    let whereClause = {};
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];



    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {

        if (filter.id === 'dataProvider') {
          filter.id = 'ExternalDataProvider'
        } else if (filter.id === 'country') {
          filter.id = 'Country'
        } else if (filter.id === 'category') {
          filter.id = 'category'
        }


        if (filter.value)
          whereClause[filter.id] = {
            [Op.like]: `%${filter.value.trim()}%`
          };
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters.id ?? "CreatedOn", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (startDate && endDate)
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };



    if (search) {
      whereClause[Op.or] = [{
        Filename: {
          [Op.like]: `%${search.trim()}%`
        }
      }, ];
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
      result: SummaryList
    });
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingListPagination = async (req, res, next) => {
  try {
    const {
      limit,
      offset
    } = getPaginationDetails(req);
    const {
      search,
      start_date: startDate,
      end_date: endDate,
      filter_by_dimension: filterByDimension,

    } = req.query;


    let whereClause = {};

    if (startDate && endDate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };
    }


    if (search) {
      whereClause[Op.or] = [{
        Filename: {
          [Op.like]: `%${search.trim()}%`
        }
      }, ];
    }

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
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
      count: count,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const fetchIndividualSmartMapping = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
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