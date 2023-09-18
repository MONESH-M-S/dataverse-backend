const { sequelize } = require("../../../../../models");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const productUnprocessedModel = require("../../../../models/SmartMapping/Nielsen/Product/ProductUnproccessed.model");
const productUnprocessedColumns = require("../../../../constants/Excel-Columns/SmartMapping/Nielsen/Product/productUnprocessedColumns");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchProductUnprocessed = async (req, res, next) => {
  try {
    const { Filename, filters, sorting } = req.query;

    const { limit, offset } = getPaginationDetails(req);

    let whereClause = {};
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value) whereClause[filter.id] = `'%${filter.value.trim()}%'`;
        else return;
      });
    }

    let query = "";
    if (Object.keys(whereClause).length) {
      Object.keys(whereClause).forEach((key) => {
        query = query + `AND u.${key} LIKE ${whereClause[key]} `;
      });
    }

    const result =
      await sequelize.query(`select * from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
          from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel
          and u.Filename='${Filename}' and (u.Uaolflag <> 'Yes' or u.Uaolflag IS NULL) ${query} order by  ${
        sortFilters.length && sortFilters[0].id ? sortFilters[0].id : "Id"
      }  ${
        sortFilters.length && sortFilters[0].desc ? "DESC" : "ASC"
      } offset ${offset} rows fetch next ${limit} rows only`);

    res.json({
      result: result[0],
    });
  } catch (error) {
    next(error);
  }
};

const fetchProductUnprocessedPagination = async (req, res, next) => {
  try {
    const { page, pageSize } = getPaginationDetails(req);
    const { Filename, filters } = req.query;

    let whereClause = {};
    let tableFilters = [];

    if (filters) {
      tableFilters = JSON.parse(filters);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value) whereClause[filter.id] = `'%${filter.value.trim()}%'`;
        else return;
      });
    }

    let query = "";
    if (Object.keys(whereClause).length) {
      Object.keys(whereClause).forEach((key) => {
        query = query + `AND u.${key} LIKE ${whereClause[key]} `;
      });
    }

    const result =
      await sequelize.query(`select count(*) as count from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
        from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
        and u.filename='${Filename}' and (u.Uaolflag <> 'Yes' or u.Uaolflag IS NULL) ${query}`);

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: result[0][0]["count"],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadProductUnproccessed = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const table = {};

    table.model = productUnprocessedModel;
    table.dimension = "Product";
    table.columns = productUnprocessedColumns;
    table.data =
      await sequelize.query(`select Externaldesc, Short, Tag, u.filename as Filename,Confidencelevel,Hiernum, Hiername, Hierlevelnum, Parenttag, Company, Brand, Flag, Productname, Categoryname, Marketname, Corporatebrandname,
            Productformname, Spfvname, Divisionname, Sectorname, Segmentname, Formname, Subformname, Productpackformname, Productpacksizename, Productvariantname, Productcodename, Scenarioflag
            from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) 
            up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel and u.filename = '${Filename}'`);

    sendAsExcelFile(res, table, Filename, table.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchProductUnprocessed,
  fetchProductUnprocessedPagination,
  downloadProductUnproccessed,
};
