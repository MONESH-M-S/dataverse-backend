const ProductPOSModel = require('../../../models/SmartMapping/POS/Product/ProductDetailPOS.model');
const FactPOSModel = require('../../../models/SmartMapping/POS/Fact/FactDetailPOS.model');
const PeriodPOSModel = require('../../../models/SmartMapping/POS/Period/PeriodDetailPOS.model')
const MarketPOSModel = require('../../../models/SmartMapping/POS/Market/MarketDetailPOS.model')

const updatePosRemappingProductValues = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["ConfidenceLevel"] = "HIGH";
        updatedValues["ConfidenceScore"] = "1";

        const updatedFile = await ProductPOSModel.update(updatedValues, {
            where: { id },
        });

        res.json({
            status: statusTypeEnum.success,
            message: `Successfully updated ${updatedFile[0]} record!`,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updatePosRemappingPeriodValues = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["ConfidenceLevel"] = "HIGH";
        updatedValues["ConfidenceScore"] = "1";

        const updatedFile = await PeriodPOSModel.update(updatedValues, {
            where: {
                id,
            },
        });

        res.json({
            status: statusTypeEnum.success,
            message: `Successfully updated ${updatedFile[0]} record!`,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updatePosRemappingMarketValues = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["ConfidenceLevel"] = "HIGH";
        updatedValues["ConfidenceScore"] = "1";

        const updatedFile = await MarketPOSModel.update(updatedValues, {
            where: {
                id,
            },
        });

        res.json({
            status: statusTypeEnum.success,
            message: `Successfully updated ${updatedFile[0]} record!`,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const updatePosRemappingFactValues = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedValues = req.body;
        updatedValues["Flag"] = "MM";
        updatedValues["Confidencelevel"] = "HIGH";
        updatedValues["Confidencescore"] = "1";

        const updatedFile = await FactPOSModel.update(updatedValues, {
            where: {
                id,
            },
        });

        res.json({
            status: statusTypeEnum.success,
            message: `Successfully updated ${updatedFile[0]} record!`,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { updatePosRemappingFactValues, updatePosRemappingPeriodValues, updatePosRemappingMarketValues, updatePosRemappingProductValues }