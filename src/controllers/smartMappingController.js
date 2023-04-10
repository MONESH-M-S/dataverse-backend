const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");
const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const MappingPeriodOutput = require("../models/mappingPeriodOutput.model");
const TempManualMappingModel = require("../models/tempManualMapping.model");
const moment = require("moment");
const { Sequelize } = require("../../models");
const MultipleMapProduct = require("../models/multipleMapProduct.model");
const dimensionEnum = require("../models/enums/dimension.enum");

const fetchSmartMappingList = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const {
      search, orderKey, orderValue, start_date: startDate, filter_by_dimension: filterByDimension,
      end_date: endDate, filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider, filter_by_category: filterByCategory
    } = req.query;

    let whereClause = {};
    let orderClause = [];

    if (orderKey || orderValue) {
      orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
    }

    if (startDate && endDate) {
      whereClause["CreatedOn"] = {
        [Op.between]: [startDate, endDate]
      }
    }

    if (filterByCountry) {
      whereClause["Country"] = {
        [Op.in]: [filterByCountry]
      }
    }

    if (filterByProvider) {
      whereClause['ExternalDataProvider'] = filterByProvider
    }

    if (filterByCategory) {
      whereClause['CATEGORY'] = filterByCategory
    }

    if (search) {
      whereClause["Filename"] = {
        [Op.like]: "%" + search + "%",
      }
    }

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension
    } else {
      whereClause["Dimension"] = dimensionEnum.product
    }

    const mappingDataList = await SmartMappingListModel.findAndCountAll({
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
    console.error("Error is ", error);
    next(error);
  }
};

const fetchIndividualSmartMapping = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await SmartMappingListModel.findByPk(id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingDashboardCount = async (req, res, next) => {
  try {
    const mappingListCount = await SmartMappingListModel.count();
    const excelFileCount = await SmartMappingListModel.count({
      where: {
        "FILENAME": {
          [Op.endsWith]: "xlsx",
        }
      },
    });
    const csvFileCount = await SmartMappingListModel.count({
      where: {
        "FILENAME": {
          [Op.endsWith]: "csv",
        }
      }
    });
    const docFileCount = await SmartMappingListModel.count({
      where: {
        "FILENAME": {
          [Op.endsWith]: "doc",
        }
      },
    });

    res.json({
      status: statusTypeEnum.success,
      data: {
        total_count: mappingListCount,
        excel_count: excelFileCount,
        csv_count: csvFileCount,
        doc_count: docFileCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingMappedDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const smartMapping = await SmartMappingListModel.findByPk(id)
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    // let orderClause = [["id", "desc"]];
    // let whereClause = {
    //   Filename: smartMapping.Filename,
    //   Confidencelevel: "HIGH"
    // }

    // const mappedList = await SmartMappingDetailsModel.findAndCountAll({
    //   limit,
    //   offset,
    //   order: orderClause,
    //   where: whereClause
    // })

    // const responseObj = {
    //   result: mappedList.rows,
    //   page,
    //   page_size: pageSize,
    //   total_count: mappedList.count,
    // };

    res.json({
      "filename": smartMapping.Filename
    });

  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingUnMappedDetails = async (req, res, next) => {
  const id = req.params.id;

  const smartMapping = await SmartMappingListModel.findByPk(id)

  const { limit, offset, page, pageSize } = getPaginationDetails(req);

  // const tempList = await TempManualMappingModel.findAll({
  //   MappingOutputId: id,
  // })

  // const idList = tempList.map((item) => item.MappingOutputId)
  let whereClause = {

    Filename: smartMapping.Filename,
    [Op.and]: [
      {
        Confidencelevel: "Low"
      },
      // {
      //   Id: {
      //     [Op.notIn]: idList
      //   },
      // },
    ]
  };

  let orderClause = [["id", "desc"]];

  const mappedList = await SmartMappingDetailsModel.findAndCountAll({
    limit,
    offset,
    where: whereClause,
    order: orderClause
  })

  const responseObj = {
    result: mappedList.rows,
    page,
    page_size: pageSize,
    total_count: mappedList.count,
  };

  res.json(responseObj);
};

const fetchSmartMappingMediumResults = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id)

    const mediumList = await SmartMappingDetailsModel.findAndCountAll({
      limit,
      offset,
      where: {
        Filename: smartMapping.Filename,
        Confidencelevel: "MEDIUM"
      },
      order: [["id", "desc"]]
    })

    const responseObj = {
      result: mediumList.rows,
      page,
      page_size: pageSize,
      total_count: mediumList.count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }

}

const updateSmartMappingDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body.mapping;

    for (let i = 0; i < data.length; i++) {
      const suggestedProduct = await MultipleMapProduct.findByPk(data[i].target)
      await SmartMappingDetailsModel.update({
        Confidencelevel: "High",
        Internaldesc: suggestedProduct.Internaldesc
      }, {
        where: {
          Id: data[i].source
        }
      })
    }

    res.json({
      status: statusTypeEnum.success,
      message: "Successfully updated ",
    });
  } catch (error) {
    next(error);
  }
};

const fetchCountryMeta = async (req, res, next) => {
  try {
    const { filter_by_dimension: filterByDimension } = req.query

    let whereClause = {};
    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension
    } else {
      whereClause["Dimension"] = dimensionEnum.product
    }

    const countryList = await SmartMappingListModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Country')), 'name']
      ],
      where: whereClause
    });
    res.json(countryList)
  } catch (error) {
    next(error)
  }
}

const fetchProviderMeta = async (req, res, next) => {
  try {
    const { filter_by_dimension: filterByDimension } = req.query

    let whereClause = {};
    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension
    } else {
      whereClause["Dimension"] = dimensionEnum.product
    }

    const providerList = await SmartMappingListModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('ExternalDataProvider')), 'name']
      ],
      where: whereClause
    });
    res.json(providerList)
  } catch (error) {
    next(error)
  }
}

const fetchCategoryMeta = async (req, res, next) => {
  try {

    const { filter_by_dimension: filterByDimension } = req.query

    let whereClause = {};
    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension
    } else {
      whereClause["Dimension"] = dimensionEnum.product
    }

    const providerList = await SmartMappingListModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Category')), 'name']
      ],
      where: whereClause
    });
    res.json(providerList)
  } catch (error) {
    next(error)
  }
}

const fetchUnmappedRecordsSuggestions = async (req, res, next) => {
  const id = req.params.id;
  const smartMapping = await SmartMappingDetailsModel.findByPk(id)
  const fileName = smartMapping.Filename
  const { search } = req.query
  let whereClause = {
    Filename: fileName
  };

  if (search) {
    whereClause["Internaldesc"] = {
      [Op.like]: "%" + search + "%",
    }
  }

  const suggestionList = await MultipleMapProduct.findAll({
    where: whereClause
  })

  res.json(suggestionList);

}

const fetchMappedRecordsForPeriodDimension = async (req, res, next) => {
  try {

    const id = req.params.id;
    const smartMapping = await SmartMappingListModel.findByPk(id)
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let whereClause = {
      Filename: smartMapping.Filename
    }

    const result = await MappingPeriodOutput.findAndCountAll({
      limit,
      offset,
      where: whereClause
    })

    const responseObj = {
      result: result.rows,
      page,
      page_size: pageSize,
      total_count: result.count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchSmartMappingList,
  fetchSmartMappingDashboardCount,
  fetchSmartMappingMappedDetails,
  fetchIndividualSmartMapping,
  fetchSmartMappingUnMappedDetails,
  fetchSmartMappingMediumResults,
  updateSmartMappingDetails,
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta,
  fetchUnmappedRecordsSuggestions,
  fetchMappedRecordsForPeriodDimension
};
