const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");
const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const TempManualMappingModel = require("../models/tempManualMapping.model");
const moment = require("moment");
const { Sequelize } = require("../../models");

const fetchSmatMappingList = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const {
      search, orderKey, orderValue, start_date: startDate,
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

    const tempList = await TempManualMappingModel.findAll({
      MappingOutputId: id,
    })

    const idList = tempList.map((item) => item.MappingOutputId)
    let whereClause = {
      Filename: smartMapping.Filename,
      [Op.or]: [
        {
          Id: {
            [Op.in]: idList
          },
        },
        {
          Confidencelevel: "HIGH"
        }
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
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingUnMappedDetails = async (req, res, next) => {
  const id = req.params.id;

  const smartMapping = await SmartMappingListModel.findByPk(id)

  const { limit, offset, page, pageSize } = getPaginationDetails(req);

  const tempList = await TempManualMappingModel.findAll({
    MappingOutputId: id,
  })

  const idList = tempList.map((item) => item.MappingOutputId)
  let whereClause = {

    Filename: smartMapping.Filename,
    [Op.and]: [
      {
        Confidencelevel: "Low"
      },
      {
        Id: {
          [Op.notIn]: idList
        },
      },
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
    const { id_list: idList } = req.body;

    const detailsList = await SmartMappingDetailsModel.findAll({
      where: {
        Id: {
          [Op.in]: idList
        }
      }
    })

    let insertDataList = []
    detailsList.forEach((item) => {
      insertDataList.push({
        Filename: item.Filename,
        Tag: item.Tag,
        Hierlevelname: item.Hierlevelname,
        Skucode: item.Skucode,
        Createdon: moment().format('YYYY-MM-DD HH:mm:ss'),
        Externaldesc: item.Externaldesc,
        Internaldesc: item.Internaldesc,
        MappingOutputId: item.Id
      })
    })

    await TempManualMappingModel.bulkCreate(insertDataList, { returning: false, });

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
    const countryList = await SmartMappingListModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Country')), 'name']
      ]
    });
    res.json(countryList)
  } catch (error) {
    next(error)
  }
}


const fetchProviderMeta = async (req, res, next) => {
  try {
    const providerList = await SmartMappingListModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('ExternalDataProvider')), 'name']
      ]
    });
    res.json(providerList)
  } catch (error) {
    next(error)
  }
}


const fetchCategoryMeta = async (req, res, next) => {
  try {
    const providerList = await SmartMappingListModel.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('Category')), 'name']
      ]
    });
    res.json(providerList)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  fetchSmatMappingList,
  fetchSmartMappingDashboardCount,
  fetchSmartMappingMappedDetails,
  fetchIndividualSmartMapping,
  fetchSmartMappingUnMappedDetails,
  fetchSmartMappingMediumResults,
  updateSmartMappingDetails,
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta
};
