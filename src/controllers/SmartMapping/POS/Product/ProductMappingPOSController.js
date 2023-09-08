const ProductMappingPOSModel = require("../../../../models/SmartMapping/POS/Product/ProductDetailPOS.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const productMappedColumns = require("../../../../constants/Excel-Columns/SmartMapping/POS/Product/posProductMappedColumns");

const fetchProductPOSMapping = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { Filename } = req.query;

    const whereClause = {
      Filename: Filename,
    };

    const result = await ProductMappingPOSModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};

const fetchProductPOSMappingPagination = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { Filename } = req.query;

    const whereClause = {
      Filename: Filename,
    };

    const count = await ProductMappingPOSModel.count({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadProductPOSMapping = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const table = {};

    const whereClause = {
      Filename: Filename,
    };

    table.model = ProductMappingPOSModel;
    table.columns = productMappedColumns;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchProductPOSMapping,
  fetchProductPOSMappingPagination,
  downloadProductPOSMapping,
};
