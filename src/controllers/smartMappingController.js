const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");
const { Op } = require("sequelize");
const statusTypeEnum = require("../enums/statusType.enum");
const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");

const fetchSmatMappingList = async (req, res, next) => {
  try {
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { search, orderKey, orderValue } = req.query;

    let whereClause = {};
    let orderClause = [];

    if (search) {
      whereClause = {
        file_name: {
          [Op.like]: "%" + search + "%",
        },
      };
    }

    if (orderKey || orderValue) {
      orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
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
    const { limit, offset, page, pageSize } = getPaginationDetails(req);
    const { search, orderKey, orderValue } = req.query;

    let whereClause = {
      smart_mapping_list_id: id,
      MAPPED_STATUS: true,
    };
    // let orderClause = [];

    // if (orderKey || orderValue) {
    //   orderClause = [[orderKey ?? "id", orderValue ?? "DESC"]];
    // }

    // if (search) {
    //   whereClause[Op.or] = [
    //     {
    //       UNILEVER_DESC: {
    //         [Op.like]: `%${search}%`,
    //       },
    //     },
    //     {
    //       VENDOR_DESC: {
    //         [Op.like]: `%${search}%`,
    //       },
    //     },
    //     {
    //       CATEGORY: {
    //         [Op.like]: `%${search}%`,
    //       },
    //     },
    //     {
    //       SEGMENT: {
    //         [Op.like]: `%${search}%`,
    //       },
    //     },
    //   ];
    // }

    const mappedList = await SmartMappingDetailsModel.findAndCountAll({
      limit,
      offset,
      // where: whereClause,
      // order: orderClause,
    });

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
  const { limit, offset, page, pageSize } = getPaginationDetails(req);

  let whereClause = {
    // smart_mapping_list_id: id,
    Confidencelevel: "Low",
  };

  // let orderClause = [["id", "desc"]];

  const mappedList = await SmartMappingDetailsModel.findAndCountAll({
    limit,
    offset,
    // where: whereClause,
    // order: orderClause,
  });

  const responseObj = {
    result: mappedList.rows,
    page,
    page_size: pageSize,
    total_count: mappedList.count,
  };

  res.json(responseObj);
};

const updateSmartMappingDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { id_list: idList } = req.body;

    // await SmartMappingDetailsModel.update(
    //   { MAPPED_STATUS: true },
    //   { where: { id: idList, smart_mapping_list_id: id } }
    // );

    res.json({
      status: statusTypeEnum.success,
      message: "Successfully updated ",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchSmatMappingList,
  fetchSmartMappingDashboardCount,
  fetchSmartMappingMappedDetails,
  fetchIndividualSmartMapping,
  fetchSmartMappingUnMappedDetails,
  updateSmartMappingDetails,
};
