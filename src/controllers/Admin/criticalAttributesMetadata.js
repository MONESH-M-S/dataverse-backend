const CriticalAttributesModel = require("../../models/Admin/criticalAttributes.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");

const criticalAttributesRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);

    const criticalAttributesList = await CriticalAttributesModel.findAll({
      limit,
      offset,
    });

    const responseObj = {
      result: criticalAttributesList,
    };

    res.json(responseObj);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const criticalAttributesPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);

    const criticalAttributesCount = await CriticalAttributesModel.count({
      limit,
      offset,
    });

    const responseObj = {
      page,
      page_size: limit,
      total_count: criticalAttributesCount,
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

const createSmlPcatRecord = async (req, res, next) => {
  try {
    const { record } = req.body;
    const createdRecord = await SmlPcatModel.create(record);
    res.json({
      status: statusTypeEnum.success,
      message: "Entry for New Metadata was successful. Team has been notified.",
      result: createdRecord,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSmlPcatRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await SmlPcatModel.destroy({
      where: {
        SML_ID: ids,
      },
    });
    res.json({
      status: statusTypeEnum.success,
      message: "Delete submission successful",
      result: deletedRecords,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criticalAttributesRecords,
  criticalAttributesPagination,
  updateSmlPcatRecords,
  createSmlPcatRecord,
  deleteSmlPcatRecords,
};
