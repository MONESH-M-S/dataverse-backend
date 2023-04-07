const SmartMappingFactListModel = require("../models/smartMappingFactList.model");
const SmartMappingFactDetailsModel = require("../models/smartMappingFactDetails.model");
const MultipleMapFact = require("../models/multipleMapFact.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Sequelize } = require("../../models");

const { Op } = require("sequelize");

const fetchSmartMappingFactList = async (req, res, next) => {
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
      whereClause["Filename"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const mappingDataList = await SmartMappingFactListModel.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    const responseObj = {
      result: mappingDataList.rows,
      page,
      page_size: pageSize,
      total_count: mappingDataList.count,
    };

    res.json(responseObj);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchSmartMappingFactDetail = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { FileName, Confidencelevel } = req.query;

    let whereClause = {};

    if (FileName) whereClause["Filename"] = FileName;

    if (Confidencelevel)
      whereClause["Confidencelevel"] = Confidencelevel.toUpperCase();

    const mappingDataList = await SmartMappingFactDetailsModel.findAndCountAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      result: mappingDataList.rows,
      page,
      page_size: pageSize,
      total_count: mappingDataList.count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchLowMappingDetails = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { FileName } = req.query;

    let whereClause = {};
    if (FileName) whereClause["Filename"] = FileName;

    const data = await MultipleMapFact.findAndCountAll({
      attributes: { exclude: ["Internaldesc", "Facttype"] },
      limit,
      offset,
      where: whereClause,
    });

    res.json({
      result: data.rows,
      page,
      page_size: pageSize,
      total_count: data.count,
    });
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const fetchMappingDataforLow = async (req, res, next) => {
  try  {
    const { Externaldesc } = req.query;

    const data = await MultipleMapFact.findAndCountAll({
      attributes: { exclude: ["Filename", "Tag"] },
      where: { Externaldesc: Externaldesc },
    });

    res.json({
      data
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const updateFactSmartMappingDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    // const { id_list: idList } = req.body;

    // const detailsList = await SmartMappingFactDetailsModel.findAll({
    //   where: {
    //     Id: {
    //       [Op.in]: idList
    //     }
    //   }
    // })

    // let insertDataList = []
    // detailsList.forEach((item) => {
    //   insertDataList.push({
    //     Filename: item.Filename,
    //     Tag: item.Tag,
    //     Hierlevelname: item.Hierlevelname,
    //     Skucode: item.Skucode,
    //     Createdon: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     Externaldesc: item.Externaldesc,
    //     Internaldesc: item.Internaldesc,
    //     MappingOutputId: item.Id
    //   })
    // })

    // await TempManualMappingModel.bulkCreate(insertDataList);

    res.json({
      status: statusTypeEnum.success,
      message: "Successfully updated ",
    });
  } catch (error) {
    next(error);
  }
};

const fetchFactCountryMeta = async (req, res, next) => {
  try {
    const countryList = await SmartMappingFactListModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Country")), "name"],
      ],
      where: {
        Dimension: "Fact",
      },
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
  try {
    const providerList = await SmartMappingFactListModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("Category")), "name"],
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

module.exports = {
  fetchSmartMappingFactList,
  fetchSmartMappingFactDetail,
  fetchFactCategoryMeta,
  fetchFactProviderMeta,
  fetchFactCountryMeta,
  updateFactSmartMappingDetails,
  fetchLowMappingDetails,
  fetchMappingDataforLow
};
