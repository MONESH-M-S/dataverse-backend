const SmartMappingFactListModel = require("../models/smartMappingFactList.model");
const SmartMappingFactDetailsModel = require("../models/smartMappingFactDetails.model");
const MultipleMapFact = require("../models/multipleMapFact.model");
const FactUnprocessed = require("../models/factUnprocessed.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Sequelize } = require("../../models");
const statusTypeEnum = require("../enums/statusType.enum");

const { Op } = require("sequelize");

const fetchSmartMappingFactList = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const {
      search,
      orderKey,
      orderValue,
      start_date: startDate,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
    } = req.query;

    let whereClause = {};
    whereClause["Dimension"] = "Fact";

    let orderClause = [];

    if (orderKey || orderValue) {
      orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
    }

    if (startDate && endDate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (filterByCountry) {
      whereClause["Country"] = {
        [Op.in]: [filterByCountry],
      };
    }

    if (filterByProvider) {
      whereClause["ExternalDataProvider"] = filterByProvider;
    }

    if (filterByCategory) {
      whereClause["CATEGORY"] = filterByCategory;
    }

    if (search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } },
        { Country: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const mappingDataList = await SmartMappingFactListModel.findAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      result: mappingDataList,
    };

    res.json(responseObj);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const fetchSmartMappingFactListPagination = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const {
      search,
      orderKey,
      orderValue,
      start_date: startDate,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
    } = req.query;

    let whereClause = {};
    whereClause["Dimension"] = "Fact";

    let orderClause = [];

    if (orderKey || orderValue) {
      orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
    }

    if (startDate && endDate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (filterByCountry) {
      whereClause["Country"] = {
        [Op.in]: [filterByCountry],
      };
    }

    if (filterByProvider) {
      whereClause["ExternalDataProvider"] = filterByProvider;
    }

    if (filterByCategory) {
      whereClause["CATEGORY"] = filterByCategory;
    }

    if (search) {
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } },
        { Country: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const count = await SmartMappingFactListModel.count({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: count,
    };

    res.json(responseObj);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchSmartMappingFactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const fileDetails = await SmartMappingFactListModel.findByPk(id);
    if (fileDetails) {
      res.json({ detail: fileDetails }).status(200);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingFactDetail = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const { Filename, confidenceLevel, search } = req.query;

    let whereClause = {};

    if (Filename) whereClause["Filename"] = Filename;

    // if (confidenceLevel)
    //   whereClause["Confidencelevel"] = confidenceLevel.toUpperCase();

    if (search) {
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const mappingDataList = await SmartMappingFactDetailsModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      result: mappingDataList,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchSmartMappingFactDetailPagination = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { Filename, confidenceLevel, search } = req.query;

    let whereClause = {};

    if (Filename) whereClause["Filename"] = Filename;

    // if (confidenceLevel)
    //   whereClause["confidenceLevel"] = confidenceLevel.toUpperCase();

    if (search) {
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const count = await SmartMappingFactDetailsModel.count({
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

const fetchLowMappingDetails = async (req, res, next) => {
  try {
    const { FileName, search } = req.query;

    let whereClause = {};
    whereClause["FileName"] = FileName;
    whereClause["Confidencelevel"] = "LOW";

    if (search) {
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const data = await SmartMappingFactDetailsModel.findAll({
      attributes: ["Externaldesc"],
      where: whereClause,
      order: [["Externaldesc", "ASC"]],
    });

    res.json({
      result: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchMappingDataforLow = async (req, res, next) => {
  try {
    const { Externaldesc } = req.query;

    const data = await MultipleMapFact.findAndCountAll({
      attributes: { exclude: ["Filename", "Tag", "Externaldesc"] },
      where: { Externaldesc: Externaldesc },
    });

    res.json({
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateFactSmartMappingLowDetails = async (req, res, next) => {
  try {
    const { FileName } = req.query;
    const { Internaldesc, Externaldesc, FactType } = req.body;

    const updatedFile = await SmartMappingFactDetailsModel.update(
      {
        Short: Internaldesc,
        Confidencelevel: "HIGH",
        Facttype: FactType,
      },
      {
        where: {
          Filename: FileName,
          Externaldesc: Externaldesc,
        },
      }
    );

    res.json({
      status: statusTypeEnum.success,
      message: `Successfully updated ${updatedFile[0]} records!`,
    });
  } catch (error) {
    next(error);
  }
};

const fetchFactUnprocessed = async (req, res, next) => {
  try {
    const { Filename, search } = req.query;
    const { limit, offset } = getPaginationDetails(req);

    let whereClause = {};
    whereClause["Filename"] = Filename;

    if (search) {
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const result = await FactUnprocessed.findAll({
      where: whereClause,
      limit,
      offset,
    });

    res.json({ result: result }).status(200);
  } catch (err) {
    next(err);
  }
};

const fetchFactUnprocessedCount = async (req, res, next) => {
  try {
    const { Filename, search } = req.query;
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let whereClause = {};
    whereClause["Filename"] = Filename;

    if (search) {
      whereClause["Externaldesc"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const result = await FactUnprocessed.count({
      where: whereClause,
      limit,
      offset,
    });

    res.json({ page, page_size: pageSize, total_count: result }).status(200);
  } catch (err) {
    next(err);
  }
};

const fetchFactCountryMeta = async (req, res, next) => {
  const { category } = req.query;

  const whereClause = {
    Dimension: "Fact",
  };

  if (category) whereClause["Category"] = category;

  try {
    const countryList = await SmartMappingFactListModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Country")), "name"],
      ],
      where: whereClause,
    });
    res.json(countryList);
  } catch (error) {
    next(error);
  }
};

const fetchFactProviderMeta = async (req, res, next) => {
  try {
    const providerList = await SmartMappingFactListModel.findAll({
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("ExternalDataProvider")),
          "name",
        ],
      ],
      where: {
        Dimension: "Fact",
      },
    });
    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

const fetchFactCategoryMeta = async (req, res, next) => {
  const { country } = req.query;

  const whereClause = {
    Dimension: "Fact",
  };

  if (country) whereClause["Country"] = country;

  try {
    const providerList = await SmartMappingFactListModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Category")), "name"],
      ],
      where: whereClause,
    });
    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchSmartMappingFactList,
  fetchSmartMappingFactDetail,
  fetchFactCategoryMeta,
  fetchFactProviderMeta,
  fetchFactCountryMeta,
  updateFactSmartMappingLowDetails,
  fetchLowMappingDetails,
  fetchMappingDataforLow,
  fetchSmartMappingFactById,
  fetchSmartMappingFactListPagination,
  fetchSmartMappingFactDetailPagination,
  fetchFactUnprocessed,
  fetchFactUnprocessedCount,
};
