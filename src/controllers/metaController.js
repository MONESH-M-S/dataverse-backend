const LoadLogModel = require('../models/loadLog.model');
const { Sequelize } = require("../../models");

const fetchCountryMeta = async (req, res, next) => {
    try {
        const countryList = await LoadLogModel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('COUNTRY')), 'name']
            ],
            where: {
                "SOURCE": "Nielsen"
            }
        });
        res.json(countryList)
    } catch (error) {
        next(error)
    }
}

const fetchProviderMeta = async (req, res, next) => {
    try {
        const providerList = await LoadLogModel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('SOURCE')), 'name']
            ],
            where: {
                "SOURCE": "Nielsen"
            }
        });
        res.json(providerList)
    } catch (error) {
        next(error)
    }
}

const fetchCategoryMeta = async (req, res, next) => {
    try {
        const providerList = await LoadLogModel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('CATEGORY')), 'name']
            ],
            where: {
                "SOURCE": "Nielsen"
            }
        });
        res.json(providerList)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchCountryMeta,
    fetchProviderMeta,
    fetchCategoryMeta
}