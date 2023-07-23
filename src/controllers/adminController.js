const SmlPcatModel = require("../models/smlPcat.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const statusTypeEnum = require("../enums/statusType.enum");

const fetchSmlPcatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { category, market, segment } = req.query;
    const whereClause = {};
    if (category) whereClause["DP_CATEGORY"] = category;
    if (market) whereClause["DP_MARKET"] = market;
    if (segment) whereClause["DP_SEGMENT"] = segment;
    const smlPcatlist = await SmlPcatModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      result: smlPcatlist,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchSmlPcatRecordsPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);
    const { category, market, segment } = req.query;
    const whereClause = {};
    if (category) whereClause["DP_CATEGORY"] = category;
    if (market) whereClause["DP_MARKET"] = market;
    if (segment) whereClause["DP_SEGMENT"] = segment;

    const smlPcatCount = await SmlPcatModel.count({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: smlPcatCount,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const updateSmlPcatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const data = req.body.records;

    if (data.length) {
      for (const record of data) {
        const { SML_ID, ...rest } = record;

        await SmlPcatModel.update(rest, {
          where: {
            SML_ID,
          },
          returning: true,
        });
      }
    }

    const smlPcatlist = await SmlPcatModel.findAll({
      limit,
      offset,
    });

    res.json({
      status: statusTypeEnum.success,
      message: "Your entry has been updated.",
      result: smlPcatlist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
  updateSmlPcatRecords,
};
