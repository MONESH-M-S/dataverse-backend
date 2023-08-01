const FactMetadata = require("../../models/admin/FactMetadata.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");

const fetchFactMetadataRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);

    const factMetadataList = await FactMetadata.findAll({
      limit,
      offset
    });

    const responseObj = { result: factMetadataList };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchFactMetadataRecordsPagination = async (req, res, next) => {
  try {
    const { limit, offset, page } = getPaginationDetails(req);

    const smlPcatCount = await FactMetadata.count({
      limit,
      offset
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

const updateFactMetadataRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const data = req.body.records;

    if (data.length) {
      for (const record of data) {
        const { Fact_ID, ...rest } = record;

        await FactMetadata.update(rest, {
          where: {
            Fact_ID,
          },
          returning: true,
        });
      }
    }

    const factMetadataList = await FactMetadata.findAll({
      limit,
      offset,
    });

    res.json({
      status: statusTypeEnum.success,
      message: "Your entry has been updated.",
      result: factMetadataList,
    });
  } catch (error) {
    next(error);
  }
};

const createFactMetadataRecord = async (req, res, next) => {
  try {
    const { record } = req.body;
    const createdRecord = await FactMetadata.create(record);
    res.json({
      status: statusTypeEnum.success,
      message: "Entry for New Metadata was successful. Team has been notified.",
      result: createdRecord,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFactMetadataRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await FactMetadata.destroy({
      where: {
        Fact_ID: ids,
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
  fetchFactMetadataRecords,
  fetchFactMetadataRecordsPagination,
  updateFactMetadataRecords,
  createFactMetadataRecord,
  deleteFactMetadataRecords
};
