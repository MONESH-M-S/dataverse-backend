const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");
const MappingProductDetailsPOSModel = require("../models/mappingProductOutputPOS.model");
const UnprocessedRecordProductPOSModel = require("../models/unprocessedRecordProductPOS.model");
const MappingPeriodDetailsPOSModel = require("../models/mappingPeriodOutputPOS.model");
const MultipleMapProductPOS = require("../models/multipleMapProductPOS.model");
const MappingPeriodOutputPOS = require("../models/mappingPeriodOutputPOS.model");
const ConfidenceLevels = require("../enums/confidenceLevel.enum");
const sendAsExcelFile = require("../utils/response/sendAsExcelFile");
const productMappedColumns = require("./../constants/columns/posProductMappedColumns");
const periodMappedColumns = require("../constants/columns/posPeriodMappedColumns");
const productUnprocessedColumns = require("../constants/columns/posProductUnprocessedColumns");
const MappingMarketDetailsPOSModel = require("../models/mappingMarketOutputPOS.model");
const marketMappedColumns = require("../constants/columns/posMarketMappedColumns");
const MappingFactDetailsPOSModel = require("../models/mappingFactOutputPOS.model");
const factMappedColumns = require("../constants/columns/posFactMappedColumns");

const fetchMappingProductPOSDetails = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset } = getPaginationDetails(req);

    const whereClause = {};

    const table = {};

    whereClause.Filename = smartMapping.Filename;

    const { HIGH, MEDIUM, LOW, UNPROCESSED } = ConfidenceLevels;

    switch (confidence) {
      case HIGH:
      case MEDIUM:
      case LOW:
        whereClause.ConfidenceLevel = confidence.toUpperCase();
        table.model = MappingProductDetailsPOSModel;
        break;
      case UNPROCESSED:
        table.model = UnprocessedRecordProductPOSModel;
    }

    table.data = await table.model.findAll({
      where: whereClause,
      limit,
      offset,
    });

    const responseObj = {
      result: table.data,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchMappingProductPOSDetailsPagination = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const whereClause = {};

    const table = {};

    whereClause.Filename = smartMapping.Filename;

    const { HIGH, MEDIUM, LOW, UNPROCESSED } = ConfidenceLevels;

    switch (confidence) {
      case HIGH:
      case MEDIUM:
      case LOW:
        whereClause.ConfidenceLevel = confidence.toUpperCase();
        table.model = MappingProductDetailsPOSModel;
        break;
      case UNPROCESSED:
        table.model = UnprocessedRecordProductPOSModel;
    }

    const count = await table.model.count({
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

const fetchUnmappedPOSRecordsSuggestions = async (req, res, next) => {
  try {
    const id = req.params.id;
    const smartMapping = await MappingProductDetailsPOSModel.findByPk(id);
    const { search } = req.query;
    let whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { Productidentifier: { [Op.like]: `%${search.trim()}%` } },
        { Externaldesc: { [Op.like]: `%${search}%` } },
      ];
    }

    const suggestionList = await MultipleMapProductPOS.findAll({
      where: whereClause,
    });

    res.json(suggestionList);
  } catch (error) {
    next(error);
  }
};

const fetchMappingPeriodPOSDetails = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset } = getPaginationDetails(req);

    const whereClause = {
      Filename: smartMapping.Filename,
    };

    const { search } = req.query;

    if (search) {
      whereClause[Op.or] = [{ Tag: { [Op.like]: `%${search.trim()}%` } }];
    }

    if (confidence === ConfidenceLevels.MAPPED) {
      const mappedData = await MappingPeriodDetailsPOSModel.findAll({
        where: whereClause,
        limit,
        offset,
      });

      const responseObj = {
        result: mappedData,
      };

      res.json(responseObj);
    }
  } catch (error) {
    next(error);
  }
};
const fetchMappingPeriodPOSDetailsPagination = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const whereClause = {
      Filename: smartMapping.Filename,
    };

    const { search } = req.query;

    if (search) {
      whereClause[Op.or] = [{ Tag: { [Op.like]: `%${search.trim()}%` } }];
    }

    if (confidence === ConfidenceLevels.MAPPED) {
      const count = await MappingPeriodDetailsPOSModel.count({
        where: whereClause,
        limit,
        offset,
      });

      const responseObj = {
        page,
        page_size: pageSize,
        total_count: count,
      };

      res.json(responseObj);
    }
  } catch (error) {
    next(error);
  }
};

const updateSmartMappingPOSDetails = async (req, res, next) => {
  try {
    const data = req.body.mapping;

    for (let i = 0; i < data.length; i++) {
      const suggestedProduct = await MultipleMapProductPOS.findByPk(
        data[i].target
      );
      await MappingProductDetailsPOSModel.update(
        {
          Confidencelevel: "HIGH",
          Internaldesc: suggestedProduct.Internaldesc,
          Confidencescore: "1",
        },
        {
          where: {
            Id: data[i].source,
          },
        }
      );
    }
    res.json({
      status: statusTypeEnum.success,
      message: "Successfully updated ",
    });
  } catch (error) {
    next(error);
  }
};

const downloadPosProductExcelFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { confidenceLevel, fileName } = req.query;

    if (!id || !confidenceLevel || !fileName) res.end();

    const { HIGH, MEDIUM, LOW, UNPROCESSED } = ConfidenceLevels;

    const table = {};

    const whereClause = {
      Filename: fileName,
    };

    switch (confidenceLevel) {
      case HIGH:
      case MEDIUM:
      case LOW:
        whereClause.Confidencelevel = confidenceLevel.toUpperCase();
        table.model = MappingProductDetailsPOSModel;
        table.columns = productMappedColumns;
        break;
      case UNPROCESSED:
        table.model = UnprocessedRecordProductPOSModel;
        table.columns = productUnprocessedColumns;
        break;
    }

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, whereClause, data);
  } catch (error) {
    next(error);
  }
};

const downloadPosPeriodExcelFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { confidenceLevel, fileName } = req.query;

    if (!id || !confidenceLevel || !fileName) res.end();

    const { MAPPED } = ConfidenceLevels;

    const table = {};

    const whereClause = {
      Filename: fileName,
    };

    switch (confidenceLevel) {
      case MAPPED:
        table.model = MappingPeriodOutputPOS;
        table.columns = periodMappedColumns;
        break;
    }

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, whereClause, data);
  } catch (error) {
    next(error);
  }
};

const fetchMappingMarketPOSDetails = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset } = getPaginationDetails(req);

    const { search } = req.query;

    const whereClause = {};

    const table = {};

    if (search) {
      whereClause[Op.or] = [
        { MarketLong: { [Op.like]: `%${search.trim()}%` } },
        { UniqueTag: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    whereClause.FileName = smartMapping.Filename;

    const { MAPPED, UNPROCESSED } = ConfidenceLevels;

    switch (confidence) {
      case MAPPED:
        table.model = MappingMarketDetailsPOSModel;
        break;
    }

    table.data = await table.model.findAll({
      where: whereClause,
      limit,
      offset,
    });

    const responseObj = {
      result: table.data,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchMappingMarketPOSDetailsPagination = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { page, pageSize, limit, offset } = getPaginationDetails(req);

    const { search } = req.query;

    const whereClause = {};

    const table = {};

    if (search) {
      whereClause[Op.or] = [
        { MarketLong: { [Op.like]: `%${search.trim()}%` } },
        { UniqueTag: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    whereClause.FileName = smartMapping.Filename;

    const { MAPPED, UNPROCESSED } = ConfidenceLevels;

    switch (confidence) {
      case MAPPED:
        table.model = MappingMarketDetailsPOSModel;
        break;
    }

    const count = await table.model.count({
      where: whereClause,
      limit,
      offset,
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

const downloadPosMarketExcelFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { confidenceLevel, fileName } = req.query;

    if (!id || !confidenceLevel || !fileName) res.end();

    const { MAPPED } = ConfidenceLevels;

    const table = {};

    const whereClause = {
      Filename: fileName,
    };

    switch (confidenceLevel) {
      case MAPPED:
        table.model = MappingMarketDetailsPOSModel;
        table.columns = marketMappedColumns;
        break;
    }

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, whereClause, data);
  } catch (error) {
    next(error);
  }
};

const fetchMappingFactPOSDetails = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const { search } = req.query;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset } = getPaginationDetails(req);

    const whereClause = {};

    const table = {};

    whereClause.Filename = smartMapping.Filename;

    if (search) {
      whereClause[Op.or] = [
        { Short: { [Op.like]: `%${search.trim()}%` } },
        { Externaldesc: { [Op.like]: `%${search.trim()}%` } },
        { Uniqueidentifier: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const { HIGH, MEDIUM, LOW } = ConfidenceLevels;

    table.model = MappingFactDetailsPOSModel;

    // switch (confidence) {
    //   case HIGH:
    //   case MEDIUM:
    //   case LOW:
    //     whereClause.ConfidenceLevel = confidence.toUpperCase();
    //     table.model = MappingFactDetailsPOSModel;
    //     break;
    // }

    table.data = await table.model.findAll({
      where: whereClause,
      limit,
      offset,
    });

    const responseObj = {
      result: table.data,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchMappingFactPOSDetailsPagination = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const { search } = req.query;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const whereClause = {};

    const table = {};

    whereClause.Filename = smartMapping.Filename;

    if (search) {
      whereClause[Op.or] = [
        { Short: { [Op.like]: `%${search.trim()}%` } },
        { Externaldesc: { [Op.like]: `%${search.trim()}%` } },
        { Uniqueidentifier: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const { HIGH, MEDIUM, LOW } = ConfidenceLevels;

    table.model = MappingFactDetailsPOSModel;

    // switch (confidence) {
    //   case HIGH:
    //   case MEDIUM:
    //   case LOW:
    //     whereClause.ConfidenceLevel = confidence.toUpperCase();
    //     table.model = MappingFactDetailsPOSModel;
    //     break;
    // }

    const count = await table.model.count({
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

const downloadPosFactExcelFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { confidenceLevel, fileName } = req.query;

    if (!id || !confidenceLevel || !fileName) res.end();

    const { HIGH } = ConfidenceLevels;

    const table = {};

    const whereClause = {
      Filename: fileName,
    };

    switch (confidenceLevel) {
      case HIGH:
        table.model = MappingFactDetailsPOSModel;
        table.columns = factMappedColumns;
        break;
    }

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, whereClause, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchMappingProductPOSDetails,
  fetchMappingProductPOSDetailsPagination,
  fetchMappingPeriodPOSDetails,
  fetchMappingPeriodPOSDetailsPagination,
  fetchUnmappedPOSRecordsSuggestions,
  updateSmartMappingPOSDetails,
  fetchMappingMarketPOSDetails,
  fetchMappingMarketPOSDetailsPagination,
  fetchMappingFactPOSDetails,
  fetchMappingFactPOSDetailsPagination,
  downloadPosProductExcelFile,
  downloadPosPeriodExcelFile,
  downloadPosMarketExcelFile,
  downloadPosFactExcelFile,
};
