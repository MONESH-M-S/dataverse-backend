const PeriodMetadata = require("../../models/Admin/PeriodMetadata.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const { Sequelize } = require("../../../models");

const fetchPeriodMetadatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { country, market } = req.query;
    const whereClause = {};

    if (country) whereClause["Country1"] = country;
    if (market) whereClause["MarketName"] = market;
    const periodMetadataList = await PeriodMetadata.findAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = { result: periodMetadataList };
    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchPeriodMetadataRecordsPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);
    const { country, market } = req.query;
    const whereClause = {};

    if (country) whereClause["Country1"] = country;
    if (market) whereClause["MarketName"] = market;

    const factCount = await PeriodMetadata.count({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: factCount,
    };
    res.json(responseObj);
  } catch (error) {
    next(error); //fetchPeriodCountryMeta, fetchPeriodPosMarketMeta,
  }
};

const fetchPeriodPosMarketMeta = async (req, res, next) => {
    try{
        const {  country } = req.query;
        const whereClause = {};

        // if (cell) whereClause["Cell"] = cell;
    if (country) whereClause["Country1"] = country;

    const list = await PeriodMetadata.findAll({
        attributes: [
          [Sequelize.fn("DISTINCT", Sequelize.col("MarketName")), "name"],
        ],
        where: whereClause,
      });
      res.json(list);

    }catch(error){
        next(error)
    }
};

const fetchPeriodCountryMeta = async (req, res, next) => {
  const { market } = req.query;
  const whereClause = {};

  // if (cell) whereClause["Cell"] = cell;
  if (market) whereClause["MarketName"] = market;

  const list = await PeriodMetadata.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("Country1")), "name"]],
    where: whereClause,
  });
  res.json(list);
};

const createPeriodMetadataRecord = async(req,res,next)=>{
    try {
        const { record } = req.body;
        const createdRecord = await PeriodMetadata.create(record);
        res.json({
          status: statusTypeEnum.success,
          message: "Entry for New Metadata was successful. Team has been notified.",
          result: createdRecord,
        });
      } catch (error) {
        next(error);
      }
};

module.exports = {
  fetchPeriodMetadatRecords,
  fetchPeriodMetadataRecordsPagination,
  fetchPeriodCountryMeta,
  fetchPeriodPosMarketMeta,
  createPeriodMetadataRecord
};
