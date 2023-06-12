const moment = require("moment");
const { Op } = require("sequelize");
const { sequelize, Sequelize } = require("../../models");
const LoadLogModel = require("../models/loadLog.model");
const SmartMappingListModel = require("../models/smartMappingList.model");

const fetchVolatilityFileMetrics = async (req, res, next) => {
  try {
    let uniqueSourceList = await LoadLogModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Source")), "source"],
      ],
      where: {
        SOURCE: {
          [Op.in]: ["Nielsen", "POS"],
        },
      },
    });

    let uniqueList = uniqueSourceList.map((item) => item.dataValues.source);

    let resultData = {};

    let whereClause = [];

    const {
      filter_by_provider: filterByProvider,
      filter_by_country: filterByCountry,
      start_date: startDate,
      end_date: endDate,
    } = req.query;

    if (filterByProvider) {
      uniqueList = filterByProvider.split(",");
    }

    if (filterByCountry) {
      whereClause["COUNTRY"] = filterByCountry;
    }

    if (startDate && endDate) {
      let startDateConverted = moment(startDate).format("YYYY-MM-DD");
      let endDateConverted = moment(endDate).format("YYYY-MM-DD");
      whereClause["LOADSTARTTIME"] = {
        [Op.between]: [startDateConverted, endDateConverted],
      };
    }

    for (let i = 0; i < uniqueList.length; i++) {
      const data = await LoadLogModel.findAll({
        attributes: [
          [
            Sequelize.fn(
              "CONVERT",
              Sequelize.literal("DATE"),
              Sequelize.col("LOADSTARTTIME")
            ),
            "date",
          ],
          [sequelize.fn("COUNT", sequelize.col("*")), "count"],
        ],
        group: [
          Sequelize.fn(
            "CONVERT",
            Sequelize.literal("DATE"),
            Sequelize.col("LOADSTARTTIME")
          ),
        ],
        where: {
          Source: uniqueList[i],
          ...whereClause,
        },
      });

      data.forEach((item) => {
        const { date, count } = item.dataValues;

        if (!resultData[date]) {
          resultData[date] = {};
        }
        resultData[date][uniqueList[i]] = count;
        resultData[date]["name"] = date;
      });
    }

    res.json({
      unique_column: uniqueList,
      mappings: resultData,
    });
  } catch (error) {
    next(error);
  }
};

const fetchFileharmonizationStatus = async (req, res, next) => {
  try {
    const uniqueSourceList = await LoadLogModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Source")), "source"],
      ],
      where: {
        SOURCE: {
          [Op.in]: ["Nielsen", "POS"],
        },
      },
    });

    const uniqueList = uniqueSourceList.map((item) => item.dataValues.source);
    let resultData = [];

    for (let i = 0; i < uniqueList.length; i++) {
      let statusList = {};
      const result = await LoadLogModel.findAll({
        attributes: [
          ["PIPELINESTATUS", "status"],
          [sequelize.fn("COUNT", sequelize.col("*")), "count"],
        ],
        group: ["PIPELINESTATUS"],
        where: {
          Source: uniqueList[i],
        },
      });

      result.forEach((item) => {
        const { status, count } = item.dataValues;
        statusList[status] = count;
      });

      statusList["provider_name"] = uniqueList[i];

      resultData.push(statusList);
    }

    res.json(resultData);
  } catch (error) {
    next(error);
  }
};

const fetchConfidenceLevel = async (req, res, next) => {
  try {
    const result = await SmartMappingListModel.findAll({
      attributes: [
        ["ExternalDataProvider", "provider"],
        [sequelize.fn("SUM", sequelize.col("High")), "high_count"],
        [sequelize.fn("SUM", sequelize.col("Medium")), "medium_count"],
        [sequelize.fn("SUM", sequelize.col("Low")), "low_count"],
      ],
      group: ["ExternalDataProvider"],
      where: {
        ExternalDataProvider: {
          [Op.in]: ["Nielsen", "POS"],
        },
      },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const fetchProviderMeta = async (req, res, next) => {
  try {
    const providerList = await LoadLogModel.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("Source")), "name"]],
      where: {
        SOURCE: {
          [Op.in]: ["Nielsen", "POS"],
        },
      },
    });

    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchVolatilityFileMetrics,
  fetchFileharmonizationStatus,
  fetchConfidenceLevel,
  fetchProviderMeta,
};
