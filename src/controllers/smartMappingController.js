const SmartMappingDetailsModel = require("../models/smartMappingDetails.model");
const SmartMappingListModel = require("../models/smartMappingList.model");
const getPaginationDetails = require("../utils/response/getPaginationDetails");

const addDummyData = async (req, res, next) => {
    try {

        const data = [
            {
                TAG: "we",
                EXTERNAL_DESC: "Axe Deo Aer Hypnotic 12X113GR/ 160 ML",
                SKUCODE: "AXE001",
                DATA_PROVIDER: "Nielsen",
                CATEGORY: "Beauty & Personal",
                FILE_NAME: "Mustard.csv",
                CONFIDENCE_LEVEL: "0.25",
                DIVISION: "",
                CATEGORY_GROUP: ""
            },
            {
                TAG: "we",
                EXTERNAL_DESC: "Axe Deo Aer Hypnotic 200 ML",
                SKUCODE: "AXE002",
                DATA_PROVIDER: "Nielsen",
                CATEGORY: "Beauty & Personal",
                FILE_NAME: "Mustard.csv",
                CONFIDENCE_LEVEL: "0.25",
                DIVISION: "",
                CATEGORY_GROUP: ""
            }
        ]

        const mappingData = await SmartMappingDetailsModel.bulkCreate(data);
        res.json(mappingData)
    } catch (error) {
        console.error("Error is ", error)
        next(error)
    }
}

const fetchSmatMappingList = async (req, res, next) => {
    try {

        const { limit, offset, page, pageSize } = getPaginationDetails(req)

        const mappingDataList = await SmartMappingListModel.findAndCountAll({
            limit,
            offset
        });

        let responseObj = {
            result: mappingDataList.rows,
            page,
            page_size: pageSize,
            total_count: mappingDataList.count
        }

        res.json(responseObj)
    } catch (error) {
        console.error("Error is ", error)
        next(error)
    }
}

const addSmartDataList = async (req, res, next) => {
    try {
        const data = [
            {
                "data_provider": "Nielsan",
                "category": "Beauty & Personal Care",
                "country": "India",
                "file_name": "UI_Hair_TR_Prod_07222202.csv",
                "file_extension": "csv",
                "mapped_record_count": "896",
                "unmapped_record_count": "10",
                "confidence_level_less_than_70": "800",
                "confidence_level_50_70": "50",
                "confidence_level_less_than_50": "46"
            },
            {
                "data_provider": "Nielsan",
                "category": "Beauty & Personal Care",
                "country": "India",
                "file_name": "UI_Hair_TR_Prod_07222202.csv",
                "file_extension": "csv",
                "mapped_record_count": "900",
                "unmapped_record_count": "50",
                "confidence_level_less_than_70": "600",
                "confidence_level_50_70": "200",
                "confidence_level_less_than_50": "100"
            }
        ]

        await SmartMappingListModel.bulkCreate(data)
        res.json({
            "status": "success",
            "message": "Successfully uploaded the data"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addDummyData,
    fetchSmatMappingList,
    addSmartDataList
}