const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");
const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const LoadLogModel = require("../models/loadLog.model");
const MappingPeriodOutput = require("../models/mappingPeriodOutput.model");
const { Sequelize, sequelize } = require("../../models");
const MultipleMapProduct = require("../models/multipleMapProduct.model");
const dimensionEnum = require("../models/enums/dimension.enum");
const ConfidenceLevels = require("../enums/confidenceLevel.enum");
const MappingMarketOutput = require("../models/mappingMarketOutput.model");
const UnprocessedRecordProductModel = require("../models/unprocessedRecordProduct.model");
const UnprocessedRecordMarketModel = require("../models/unprocessedRecordMarket.model");
const ExcelJS = require("exceljs");
const SmartMappingFactListModel = require("../models/smartMappingFactList.model");
const SmartMappingFactDetailsModel = require("../models/smartMappingFactDetails.model");
const productMappedColumns = require("./../constants/columns/productMappedColumns");
const factMappedColumns = require("../constants/columns/factMappedColumns");
const periodMappedColumns = require("../constants/columns/periodMappedColumns");
const marketMappedColumns = require("../constants/columns/marketMappedColumns");
const marketUnprocessedColumns = require("../constants/columns/marketUnprocessedColumns");
const productUnprocessedColumns = require("../constants/columns/productUnprocessedColumns");
const factUnprocessedColumn = require("../constants/columns/factUnprocessedColumn");
const sendAsExcelFile = require("../utils/response/sendAsExcelFile");
const FactUnprocessed = require("../models/factUnprocessed.model");
const MappingProductDetailsPOSModel = require("./../models/mappingProductOutputPOS.model");
const UnprocessedRecordProductPOSModel = require("./../models/unprocessedRecordProductPOS.model");
const MappingPeriodDetailsPOSModel = require("./../models/mappingPeriodOutputPOS.model");

const fetchSmartMappingList = async (req, res, next) => {
  try {
    const { limit, offset } = getPaginationDetails(req);
    const {
      search,
      orderKey,
      orderValue,
      start_date: startDate,
      filter_by_dimension: filterByDimension,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
    } = req.query;

    let whereClause = {};
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

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      whereClause["Dimension"] = dimensionEnum.product;
    }

    const mappingDataList = await SmartMappingListModel.findAll({
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
    console.error("Error is ", error);
    next(error);
  }
};
const fetchSmartMappingListPagination = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const {
      search,
      orderKey,
      orderValue,
      start_date: startDate,
      filter_by_dimension: filterByDimension,
      end_date: endDate,
      filter_by_country: filterByCountry,
      filter_by_provider: filterByProvider,
      filter_by_category: filterByCategory,
    } = req.query;

    let whereClause = {};
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

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      whereClause["Dimension"] = dimensionEnum.product;
    }

    const count = await SmartMappingListModel.count({
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
        FILENAME: {
          [Op.endsWith]: "xlsx",
        },
      },
    });
    const csvFileCount = await SmartMappingListModel.count({
      where: {
        FILENAME: {
          [Op.endsWith]: "csv",
        },
      },
    });
    const docFileCount = await SmartMappingListModel.count({
      where: {
        FILENAME: {
          [Op.endsWith]: "doc",
        },
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

    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { limit, offset } = getPaginationDetails(req);

    const mappedData =
      await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'HIGH' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);

    const responseObj = {
      result: mappedData[0],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchSmartMappingMappedDetailsPagination = async (req, res, next) => {
  try {
    const id = req.params.id;

    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    const count =
      await sequelize.query(`select count(*) from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'HIGH'`);

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: count[0][0][""],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingUnMappedDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const mappedList =
      await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'LOW' order by u.Id desc`);

    const responseObj = {
      result: mappedList[0],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchSmartMappingMediumResults = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { limit, offset } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id);

    const mediumList =
      await sequelize.query(`select * from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'MEDIUM' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);

    const responseObj = {
      result: mediumList[0],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchSmartMappingMediumResultsPagination = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id);

    const count =
      await sequelize.query(`select count(*) from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
    from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
    and u.filename = '${smartMapping.Filename}' and u.Confidencelevel = 'MEDIUM'`);

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: count[0][0][""],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const updateSmartMappingDetails = async (req, res, next) => {
  try {
    const data = req.body.mapping;

    for (let i = 0; i < data.length; i++) {
      const suggestedProduct = await MultipleMapProduct.findByPk(
        data[i].target
      );
      await SmartMappingDetailsModel.update(
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

const fetchCountryMeta = async (req, res, next) => {
  try {
    const { filter_by_dimension: filterByDimension, category } = req.query;

    let whereClause = {};
    let modal = SmartMappingListModel;

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      modal = LoadLogModel;

      whereClause["Country"] = {
        [Op.not]: null,
      };

      whereClause["Country"] = {
        [Op.not]: "CzechRepublic_BACKUP20230316",
      };
    }

    if (category) whereClause["Category"] = category;

    const countryList = await modal.findAll({
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

const fetchProviderMeta = async (req, res, next) => {
  try {
    const { filter_by_dimension: filterByDimension } = req.query;

    let whereClause = {};
    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      whereClause["Dimension"] = dimensionEnum.product;
    }

    const providerList = await SmartMappingListModel.findAll({
      attributes: [
        [
          Sequelize.fn("DISTINCT", Sequelize.col("ExternalDataProvider")),
          "name",
        ],
      ],
      where: whereClause,
    });
    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

const fetchCategoryMeta = async (req, res, next) => {
  try {
    const { filter_by_dimension: filterByDimension, country } = req.query;

    let whereClause = {};

    if (filterByDimension) {
      whereClause["Dimension"] = filterByDimension;
    } else {
      whereClause["Dimension"] = dimensionEnum.product;
    }

    if (country) whereClause["Country"] = country;

    const providerList = await SmartMappingListModel.findAll({
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

const fetchUnmappedRecordsSuggestions = async (req, res, next) => {
  try {
    const id = req.params.id;
    const smartMapping = await SmartMappingDetailsModel.findByPk(id);
    const externalDesc = smartMapping.Externaldesc;
    const tag = smartMapping.Tag;
    const { search } = req.query;
    let whereClause = {
      Externaldesc: externalDesc,
      Tag: tag,
    };

    if (search) {
      whereClause["Internaldesc"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const suggestionList = await MultipleMapProduct.findAll({
      where: whereClause,
    });

    res.json(suggestionList);
  } catch (error) {
    next(error);
  }
};

const fetchMappedRecordsForPeriodDimension = async (req, res, next) => {
  try {
    const id = req.params.id;

    const { search } = req.query;

    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { limit, offset } = getPaginationDetails(req);

    let whereClause = {
      Filename: smartMapping.Filename,
    };

    if (search) {
      whereClause[Op.or] = [
        { Short: { [Op.like]: `%${search.trim()}%` } },
        { Long: { [Op.like]: `%${search.trim()}%` } },
        { Periodicity: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const result = await MappingPeriodOutput.findAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      result: result,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchMappedRecordsForPeriodDimensionPagination = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const { search } = req.query;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let whereClause = {
      Filename: smartMapping.Filename,
    };

    if (search) {
      whereClause[Op.or] = [
        { Short: { [Op.like]: `%${search.trim()}%` } },
        { Long: { [Op.like]: `%${search.trim()}%` } },
        { Periodicity: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const result = await MappingPeriodOutput.count({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: result,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchMappedRecordsForMarketDimension = async (req, res, next) => {
  try {
    const id = req.params.id;
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { limit, offset } = getPaginationDetails(req);
    const { search } = req.query;

    let whereClause = {
      Filename: smartMapping.Filename,
    };

    if (search) {
      whereClause["Long"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const result = await MappingMarketOutput.findAndCountAll({
      limit,
      offset,
      where: whereClause,
    });

    const responseObj = {
      result: result.rows,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchMappedRecordsForMarketDimensionPagination = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { search } = req.query;

    let whereClause = {
      Filename: smartMapping.Filename,
    };

    if (search) {
      whereClause["Long"] = {
        [Op.like]: "%" + search + "%",
      };
    }

    const count = await MappingMarketOutput.count({
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

const fetchUnproccessedMarket = async (req, res, next) => {
  try {
    const { Filename } = req.query;
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let whereClause = {
      Filename: Filename,
    };

    const result = await UnprocessedRecordMarketModel.findAll({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ result });
  } catch (err) {
    next(err);
  }
};

const fetchUnproccessedMarketCount = async (req, res, next) => {
  try {
    const { Filename } = req.query;
    const { limit, offset, page, pageSize } = getPaginationDetails(req);

    let whereClause = {
      Filename: Filename,
    };

    const result = await UnprocessedRecordMarketModel.count({
      limit,
      offset,
      where: whereClause,
    });

    res.json({ page, page_size: pageSize, total_count: result });
  } catch (err) {
    next(err);
  }
};

const fetchUnprocessedProductRecords = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { limit, offset } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { search } = req.query;

    let result;

    if (search !== undefined && search.length) {
      result =
        await sequelize.query(`select * from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
        from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel
        and u.Filename='${smartMapping.Filename}' and u.Externaldesc LIKE '% ${search} %' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);
    } else {
      result =
        await sequelize.query(`select * from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
      from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
      and u.filename='${smartMapping.Filename}' order by u.Id desc offset ${offset} rows fetch next ${limit} rows only`);
    }

    const responseObj = {
      result: result[0],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};
const fetchUnprocessedProductRecordsPagination = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { search } = req.query;

    let result;

    if (search !== undefined && search.length) {
      result =
        await sequelize.query(`select count(*) from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
        from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel
        and u.Filename='${smartMapping.Filename}' and u.Externaldesc LIKE '% ${search} %'`);
    } else {
      result =
        await sequelize.query(`select count(*) from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
      from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
      and u.filename='${smartMapping.Filename}'`);
    }

    const responseObj = {
      page,
      page_size: pageSize,
      total_count: result[0][0][""],
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const fetchUnprocessedRecords = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const { search } = req.query;

    let modelName;
    let whereClause = {};
    let searchClause = {};

    switch (smartMapping.Dimension) {
      case dimensionEnum.market:
        modelName = UnprocessedRecordMarketModel;
        searchClause = {
          Long: {
            [Op.like]: "%" + search + "%",
          },
        };
        break;
      case dimensionEnum.product:
      default:
        modelName = UnprocessedRecordProductModel;
        searchClause = {
          Externaldesc: {
            [Op.like]: "%" + search + "%",
          },
        };
        whereClause = {
          // "Hierlevelnum": {
          //   [Sequelize.Op.in]: Sequelize.literal('((select max(cast(Hierlevelnum as int)) from [Mapping].[UnProcessedRecordsProduct] where Hierlevelnum is not null group by filename))')
          // }
        };
    }

    if (!search) searchClause = {};

    const result = await modelName.findAndCountAll({
      limit,
      offset,
      where: {
        ...searchClause,
        Filename: smartMapping.Filename,
        ...whereClause,
      },
    });

    const responseObj = {
      result: result.rows,
      page,
      page_size: pageSize,
      total_count: result.count,
    };

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

const downloadUnProcessedExcel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const smartMapping = await SmartMappingListModel.findByPk(id);
    const fileName = smartMapping.Filename;

    let modelName;
    let columns;

    switch (smartMapping.Dimension) {
      case dimensionEnum.market:
        modelName = UnprocessedRecordMarketModel;
        columns = [
          { header: "ID", key: "Id", width: 10 },
          { header: "File Name", key: "FileName", width: 40 },
          { header: "Tag", key: "Tag", width: 40 },
          { header: "External Description", key: "Long", width: 30 },
          { header: "HierName", key: "HierName", width: 40 },
          { header: "HierLevelName", key: "HierLevelName", width: 40 },
          { header: "Country", key: "Country", width: 10 },
          { header: "Category", key: "Category", width: 20 },
          { header: "Cell", key: "Cell", width: 20 },
          { header: "Createdon", key: "Createdon", width: 20 },
        ];
        break;
      case dimensionEnum.product:
      default:
        modelName = UnprocessedRecordProductModel;
        columns = [
          { header: "ID", key: "Id", width: 10 },
          { header: "File Name", key: "FileName", width: 40 },
          { header: "Tag", key: "Tag", width: 40 },
          { header: "External Description", key: "Externaldesc", width: 30 },
          { header: "Created On", key: "Createdon", width: 10 },
          { header: "Remark", key: "Remark", width: 40 },
        ];
    }

    const data = await modelName.findAll({
      where: {
        Filename: fileName,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("");

    worksheet.columns = columns;

    data.forEach((item) => {
      worksheet.addRow(item.toJSON());
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    next(error);
  }
};

const downloadProductExcelFile = async (req, res, next) => {
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
        table.model = SmartMappingDetailsModel;
        table.dimension = "Product";
        table.columns = productMappedColumns;
        table.data =
          await sequelize.query(`select Externaldesc, Short, Tag, u.filename as Filename, Hiernum, Hiername, Hierlevelnum, Parenttag, Company, Brand, Flag, Productname, Categoryname, Marketname, Corporatebrandname,
          Productformname, Spfvname, Divisionname, Sectorname, Segmentname, Formname, Subformname, Productpackformname, Productpacksizename, Productvariantname, Productcodename, Scenarioflag
          from [Mapping].[MappingProductOutput] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel from [Mapping].[MappingProductOutput] where hierlevelnum is not null group by filename) 
          up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel and u.filename = '${whereClause.Filename}' and u.Confidencelevel = '${whereClause.Confidencelevel}'`);
        break;
      case UNPROCESSED:
        table.model = UnprocessedRecordProductModel;
        table.dimension = "Product";
        table.columns = productUnprocessedColumns;
        table.data =
          await sequelize.query(`select Id, u.filename as Filename, Tag, Externaldesc, Createdon, Remark from [Mapping].[UnProcessedRecordsProduct] u join (select filename,max(cast(hierlevelnum as int)) as MaxHierLevel
        from [Mapping].[UnProcessedRecordsProduct] where hierlevelnum is not null group by filename) up on u.filename=up.filename and u.Hierlevelnum=up.MaxHierLevel 
        and u.filename='${whereClause.Filename}'`);
        break;
    }

    sendAsExcelFile(res, table, whereClause, table.data[0]);
  } catch (error) {
    next(error);
  }
};

const downloadFactExcelFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { confidenceLevel, fileName } = req.query;

    if (!id || !confidenceLevel || !fileName) res.end();

    let table = {},
      whereClause = {};

    if (confidenceLevel === "unprocessed") {
      (table["model"] = FactUnprocessed),
        (table["columns"] = factUnprocessedColumn);
      whereClause["Filename"] = fileName;
    } else if (confidenceLevel) {
      table["model"] = SmartMappingFactDetailsModel;
      table["columns"] = factMappedColumns;
      whereClause["Filename"] = fileName;
      whereClause["Confidencelevel"] = confidenceLevel.toUpperCase();
    }

    const data = await table.model.findAll({
      where: whereClause,
    });

    sendAsExcelFile(res, table, whereClause, data);
  } catch (error) {
    next(error);
  }
};

const downloadMarketExcelFile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { confidenceLevel, fileName } = req.query;

    if (!id || !confidenceLevel || !fileName) res.end();

    const { MAPPED, UNPROCESSED } = ConfidenceLevels;

    const table = {};

    const whereClause = {
      Filename: fileName,
    };

    switch (confidenceLevel) {
      case MAPPED:
        table.model = MappingMarketOutput;
        table.columns = marketMappedColumns;
        break;
      case UNPROCESSED:
        table.model = UnprocessedRecordMarketModel;
        table.columns = marketUnprocessedColumns;
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

const downloadPeriodExcelFile = async (req, res, next) => {
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
        table.model = MappingPeriodOutput;
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
        whereClause.ConfidenceLevel = confidence.toUpperCase();
        table.model = MappingProductDetailsPOSModel;
        break;
      case LOW:
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
        whereClause.ConfidenceLevel = confidence.toUpperCase();
        table.model = MappingProductDetailsPOSModel;
        break;
      case LOW:
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

const fetchMappingPeriodPOSDetails = async (req, res, next) => {
  try {
    const { id, confidence } = req.params;

    const smartMapping = await SmartMappingListModel.findByPk(id);

    const { limit, offset } = getPaginationDetails(req);

    const whereClause = {
      Filename: smartMapping.Filename,
    };

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

    res.json(responseObj);
  } catch (error) {
    next(error);
  }
};

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
  fetchSmartMappingListPagination,
  fetchUnprocessedProductRecords,
  fetchSmartMappingMappedDetailsPagination,
  fetchSmartMappingMediumResultsPagination,
  fetchUnprocessedProductRecordsPagination,
  fetchMappedRecordsForMarketDimensionPagination,
  fetchUnproccessedMarket,
  fetchUnproccessedMarketCount,
  fetchMappedRecordsForPeriodDimensionPagination,
  downloadProductExcelFile,
  downloadFactExcelFile,
  downloadMarketExcelFile,
  downloadPeriodExcelFile,
  fetchMappingProductPOSDetails,
  fetchMappingProductPOSDetailsPagination,
  fetchMappingPeriodPOSDetails,
  fetchMappingPeriodPOSDetailsPagination,
};
