const { sequelize } = require("../../../../../models");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const SmartMappingProductModel = require("../../../../models/SmartMapping/Nielsen/Product/ProductDetail.model");
const ProductMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/Nielsen/Product/productMappedColumns");

const fetchProductMapping = async (req, res, next) => {
  try {
    const { Filename, Confidencelevel } = req.query;

    const { limit, offset } = getPaginationDetails(req);

    const result =
      await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
      from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
      and u.filename = '${Filename}' and u.Confidencelevel = '${Confidencelevel}' and u.Uaolflag <> 'Yes'  order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);

    res.json({ result: result[0] });
  } catch (error) {
    next(error);
  }
};

const fetchProductMappingPagination = async (req, res, next) => {
  try {
    const { Filename, Confidencelevel } = req.query;

    const { page, pageSize } = getPaginationDetails(req);

    const count =
      await sequelize.query(`select count(*) as count from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
      from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
      and u.filename = '${Filename}' and u.Confidencelevel = '${Confidencelevel}' and u.Uaolflag <> 'Yes' `);

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: count[0][0]["count"],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadProductMapping = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const table = {};

    table.model = SmartMappingProductModel;
    table.dimension = "Product";
    table.columns = ProductMappedColumns;
    table.data =
      await sequelize.query(`select Externaldesc, Short, Tag, u.filename as Filename,Confidencelevel,Hiernum, Hiername, Hierlevelnum, Parenttag, Company, Brand, Flag, Productname, Categoryname, Marketname, Corporatebrandname,
            Productformname, Spfvname, Divisionname, Sectorname, Segmentname, Formname, Subformname, Productpackformname, Productpacksizename, Productvariantname, Productcodename, Scenarioflag
            from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) 
            up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel and u.filename = '${Filename}' and u.Uaolflag <> 'Yes'`);

    sendAsExcelFile(res, table, Filename, table.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchProductMapping,
  fetchProductMappingPagination,
  downloadProductMapping,
};
