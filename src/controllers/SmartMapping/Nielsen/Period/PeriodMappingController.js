const PeriodMappingModel = require("../../../../models/SmartMapping/Nielsen/Period/PeriodDetail.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const periodMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/Nielsen/Period/periodMappedColumns");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchPeriodMapping = async (req, res, next) => {
  try {
    const {
      Filename,
      Search,
      filters,
      sorting
    } = req.query;

    const {
      limit,
      offset
    } = getPaginationDetails(req);

    const whereClause = {
      Filename: Filename,
    };
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value)
          whereClause[filter.id] = {
            [Op.like]: `%${filter.value.trim()}%`
          };
        else
          return
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }

    if (Search) {
      whereClause[Op.or] = [{
          Short: {
            [Op.like]: `%${Search.trim()}%`
          }
        },
        {
          Long: {
            [Op.like]: `%${Search.trim()}%`
          }
        },
        {
          Periodicity: {
            [Op.like]: `%${Search.trim()}%`
          }
        },
        {
          Tag: {
            [Op.like]: `%${Search}%`
          }
        },
      ];
    }
    const result = await PeriodMappingModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    res.json({
      result: result
    });
  } catch (error) {
    next(error);
  }
};

const fetchPeriodMappingPagination = async (req, res, next) => {
  try {
    const {
      Filename,
      Search,
      filters,
      sorting
    } = req.query;

    const {
      limit,
      offset,
      page,
      pageSize
    } = getPaginationDetails(req);

    let whereClause = {
      Filename: Filename,
    };
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value)
          whereClause[filter.id] = {
            [Op.like]: `%${filter.value.trim()}%`
          };
        else
          return
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }


    if (Search) {
      whereClause[Op.or] = [{
          Short: {
            [Op.like]: `%${Search.trim()}%`
          }
        },
        {
          Long: {
            [Op.like]: `%${Search.trim()}%`
          }
        },
        {
          Periodicity: {
            [Op.like]: `%${Search.trim()}%`
          }
        },
        {
          Tag: {
            [Op.like]: `%${Search}%`
          }
        },
      ];
    }

    const result = await PeriodMappingModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: result,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadPeriodMapping = async (req, res, next) => {
  try {
    const {
      Filename
    } = req.query;

    const table = {};

    let whereClause = {
      Filename: Filename,
    };

    table.model = PeriodMappingModel;
    table.columns = periodMappedColumns;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchPeriodMapping,
  fetchPeriodMappingPagination,
  downloadPeriodMapping,
};