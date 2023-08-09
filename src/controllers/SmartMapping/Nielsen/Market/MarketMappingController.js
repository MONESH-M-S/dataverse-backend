const MarketMappingModel = require('../../../../models/SmartMapping/Nielsen/Market/MarketDetail.model');
const getPaginationDetails = require('../../../../utils/response/getPaginationDetails')
const marketMappedColumns = require('../../../../constants/Excel-Columns/SmartMapping/Nielsen/Market/marketMappedColumns')
const sendAsExcelFile = require("../../../../utils/response/sendAsExcelFile");

const fetchMarketMapping = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { Filename, Search } = req.query;

    let whereClause = {
      Filename: Filename,
    };

    if (Search) {
      whereClause[Op.or] = [
        { Long: { [Op.like]: `%${Search}%` } },
        { Tag: { [Op.like]: `%${Search}%` } },
      ];
    }

    const result = await MarketMappingModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ result: result });
  } catch (error) {
    next(error);
  }
};
const fetchMarketMappingPagination = async (
  req,
  res,
  next
) => {
  try {

    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { Filename, Search } = req.query;

    let whereClause = {
      Filename: Filename,
    };

    if (Search) {
      whereClause[Op.or] = [
        { Long: { [Op.like]: `%${Search}%` } },
        { Tag: { [Op.like]: `%${Search}%` } },
      ];
    }

    const count = await MarketMappingModel.count({
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


const downloadMarketMapping = async (req, res, next) => {
  try {
    const { Filename } = req.query;

    const table = {};

    const whereClause = {
      Filename: Filename,
    };

    table.model = MarketMappingModel;
    table.columns = marketMappedColumns;

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, Filename, data);
  } catch (error) {
    next(error);
  }
};


module.exports = { fetchMarketMapping, fetchMarketMappingPagination, downloadMarketMapping }