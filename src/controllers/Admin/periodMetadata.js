const PeriodMetadata = require("../../models/Admin/PeriodMetadata.model");
const getPaginationDetails = require("../../utils/response/getPaginationDetails");
const statusTypeEnum = require("../../enums/statusType.enum");
const { Sequelize } = require("../../../models");
const { Op } = require("sequelize");

const fetchPeriodMetadatRecords = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
   
    const { filters, sorting } = req.query;

    let whereClause = {};
    let orderClause = [];
    let tableFilters = [];
    let sortFilters = [];

    if (filters && sorting) {
      tableFilters = JSON.parse(filters);
      sortFilters = JSON.parse(sorting);
    }

    if (tableFilters.length > 0) {
      tableFilters.forEach((filter) => {
        if (filter.value)
          whereClause[filter.id] = { [Op.like]: `%${filter.value.trim()}%` };
      });
    }

    if (sortFilters.length > 0) {
      orderClause = [
        [sortFilters[0].id ?? "Id", sortFilters[0].desc ? "DESC" : "ASC"],
      ];
    }
 
    const periodMetadataList = await PeriodMetadata.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = { result: periodMetadataList.rows, count:periodMetadataList.count };
    
    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};


const updatePeriodMetadataRecords = async (req, res, next) => {
    try {     
      const data = req.body.records;

      if (data.length) {
        for (const record of data) {
          const { Id, ...rest } = record;
  
          await PeriodMetadata.update(rest, {
            where: {
              Id,
            },
            returning: true,
          });
        }
      }

      res.json({
        status: statusTypeEnum.success,
        message: "Your entry has been updated.",
      });
    } catch (error) {
        next(error);
    }
};

const createPeriodMetadataRecord = async (req, res, next) => {
  try {
    const { records } = req.body;
    const createdRecords = await PeriodMetadata.bulkCreate(records);
    res.json({
      status: statusTypeEnum.success,
      message: `Entr${
        records.length > 1 ? "ies" : "y"
      } for New Metadata was successful. Team has been notified.`,
      result: createdRecords,
    });
  } catch (error) {
    next(error);
  }
};

const deletePeriodMetadataRecords = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const deletedRecords = await PeriodMetadata.destroy({
      where: {
        Id: ids,
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
  fetchPeriodMetadatRecords,
  updatePeriodMetadataRecords,
  createPeriodMetadataRecord,
  deletePeriodMetadataRecords
};
