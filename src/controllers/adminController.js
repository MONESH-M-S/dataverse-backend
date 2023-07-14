const SmlPcatModel = require("../models/smlPcat.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const statusTypeEnum = require("../enums/statusType.enum");

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
