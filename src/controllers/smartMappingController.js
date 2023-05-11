const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");
const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const MappingPeriodOutput = require("../models/mappingPeriodOutput.model");
const { Sequelize, sequelize } = require("../../models");
const MultipleMapProduct = require("../models/multipleMapProduct.model");
const dimensionEnum = require("../models/enums/dimension.enum");
const MappingMarketOutput = require("../models/mappingMarketOutput.model");
const UnporcessedRecordProductModel = require("../models/unporcessedRecordProduct.model");
const UnporcessedRecordMarketModel = require("../models/unporcessedRecordMarket.model");
const ExcelJS = require('exceljs');

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
      whereClause[Op.or] = [
        { Filename: { [Op.like]: `%${search.trim()}%` } },
        { Category: { [Op.like]: `%${search.trim()}%` } }
      ]
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

    const mappedData = await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'HIGH' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);

    const responseObj = {
      result: mappedData[0],
      page,
      page_size: pageSize,
      total_count: mappedData[1],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingUnMappedDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const smartMapping = await SmartMappingListModel.findByPk(id)

    const mappedList = await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'LOW' order by u.Id desc`);

    const responseObj = {
      result: mappedList[0],
    };

    res.json(responseObj);
  } catch (error) {
    next(error)
  }

};

const fetchSmartMappingMediumResults = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id)

    const mediumList = await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'MEDIUM' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);


    const responseObj = {
      result: mediumList[0],
      page,
      page_size: pageSize,
      total_count: mediumList[1],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }

}

const updateSmartMappingDetails = async (req, res, next) => {
  try {
    const data = req.body.mapping;

    for (let i = 0; i < data.length; i++) {
      const suggestedProduct = await MultipleMapProduct.findByPk(data[i].target)
      await SmartMappingDetailsModel.update({
        Confidencelevel: "HIGH",
        Internaldesc: suggestedProduct.Internaldesc,
        Confidencescore: "1"
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
  try {
    const id = req.params.id;
    const smartMapping = await SmartMappingDetailsModel.findByPk(id)
    const externalDesc = smartMapping.Externaldesc
    const tag = smartMapping.Tag
    const { search } = req.query
    let whereClause = {
      Externaldesc: externalDesc,
      Tag: tag
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
  } catch (error) {
    next(error)
  }


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

const fetchMappedRecordsForMarketDimension = async (req, res, next) => {
  try {

    const id = req.params.id;
    const smartMapping = await SmartMappingListModel.findByPk(id)
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { search } = req.query

    let whereClause = {
      Filename: smartMapping.Filename
    }

    if (search) {
      whereClause["Long"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const result = await MappingMarketOutput.findAndCountAll({
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

const fetchUnprocessedProductRecords = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { search } = req.query;

    let result;

    if(search !== undefined && search.length) {
      result = await sequelize.query(`select * from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
        from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel
        and u.Filename='${smartMapping.Filename}' and u.Externaldesc LIKE '% ${search} %' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);
    } else {
      result = await sequelize.query(`select * from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
      from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
      and u.filename='${smartMapping.Filename}' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);
    };

    console.log(result);
    
    const responseObj = {
      result: result[0],
      page,
      page_size: pageSize,
      total_count: result[1],
    };

    res.json(responseObj);

  } catch (error) {
    next(error)
  }
}

const fetchUnprocessedRecords = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id)
    const { search } = req.query

    let modelName;
    let whereClause = {}
    let searchClause = {}

    switch (smartMapping.Dimension) {
      case dimensionEnum.market:
        modelName = UnporcessedRecordMarketModel
        searchClause = {
          "Long": {
            [Op.like]: "%" + search + "%",
          }
        }
        break
      case dimensionEnum.product:
      default:
        modelName = UnporcessedRecordProductModel
        searchClause = {
          "Externaldesc": {
            [Op.like]: "%" + search + "%",
          },
        }
        whereClause = {
          // "Hierlevelnum": {
          //   [Sequelize.Op.in]: Sequelize.literal('((select max(cast(Hierlevelnum as int)) from [Mapping].[UnProcessedRecordsProduct] where Hierlevelnum is not null group by filename))')
          // }
        };
    }

    if (!search) searchClause = {}

    const result = await modelName.findAndCountAll({
      limit,
      offset,
      where: {
        ...searchClause,
        Filename: smartMapping.Filename,
        ...whereClause,
      },
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

const downloadUnProcessedExcel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const smartMapping = await SmartMappingListModel.findByPk(id)
    const fileName = smartMapping.Filename

    let modelName;
    let columns;

    switch (smartMapping.Dimension) {
      case dimensionEnum.market:
        modelName = UnporcessedRecordMarketModel
        columns = [
          { header: 'ID', key: 'Id', width: 10 },
          { header: 'File Name', key: 'FileName', width: 40 },
          { header: 'Tag', key: 'Tag', width: 40 },
          { header: 'External Description', key: 'Long', width: 30 },
          { header: 'HierName', key: 'HierName', width: 40 },
          { header: 'HierLevelName', key: 'HierLevelName', width: 40 },
          { header: 'Country', key: 'Country', width: 10 },
          { header: 'Category', key: 'Category', width: 20 },
          { header: 'Cell', key: 'Cell', width: 20 },
          { header: 'Createdon', key: 'Createdon', width: 20 },
        ]
        break
      case dimensionEnum.product:
      default:
        modelName = UnporcessedRecordProductModel
        columns = [
          { header: 'ID', key: 'Id', width: 10 },
          { header: 'File Name', key: 'FileName', width: 40 },
          { header: 'Tag', key: 'Tag', width: 40 },
          { header: 'External Description', key: 'Externaldesc', width: 30 },
          { header: 'Created On', key: 'Createdon', width: 10 },
          { header: 'Remark', key: 'Remark', width: 40 }
        ]
    }

    const data = await modelName.findAll({
      where: {
        Filename: fileName
      },
    })

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('');

    worksheet.columns = columns

    data.forEach((item) => {
      worksheet.addRow(item.toJSON());
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + fileName
    );

    await workbook.xlsx.write(res);

    res.end();

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
  fetchMappedRecordsForPeriodDimension,
  fetchMappedRecordsForMarketDimension,
  fetchUnprocessedRecords,
  downloadUnProcessedExcel,
  fetchUnprocessedProductRecords
};
