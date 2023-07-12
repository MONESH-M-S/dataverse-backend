const SmlPcatModel = require("../models/smlPcat.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");

const fetchSmlPcatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const smlPcatlist = await SmlPcatModel.findAll({
      limit,
      offset,
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

    const smlPcatCount = await SmlPcatModel.count({
      limit,
      offset,
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
module.exports = {
  fetchSmlPcatRecords,
  fetchSmlPcatRecordsPagination,
};
