const ProductUnprocessedPOSModel = require("../../../../models/SmartMapping/POS/Product/ProductUnprocessedPOS.model");
const getPaginationDetails = require("../../../../utils/response/getPaginationDetails");
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");
const productUnprocessedColumns = require("../../../../constants/Excel-Columns/SmartMapping/POS/Product/posProductUnprocessedColumns");

const fetchProductPOSUnprocessed = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { Filename } = req.query;

    const whereClause = {
      Filename: Filename,
    };

    const result = await ProductUnprocessedPOSModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};

const fetchProductPOSUnprocessedPagination = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { Filename } = req.query;

    const whereClause = {
      Filename: Filename,
    };

    const count = await ProductUnprocessedPOSModel.count({
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

const downloadProductPOSUnprocessed = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const table = {};

    const whereClause = {
      Filename: Filename,
    };

    table.model = ProductUnprocessedPOSModel;
    table.columns = productUnprocessedColumns;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchProductPOSUnprocessed,
  fetchProductPOSUnprocessedPagination,
  downloadProductPOSUnprocessed,
};
