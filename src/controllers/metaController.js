const LoadLogModel = require('../models/loadLog.model');
const { Sequelize } = require("../../models");

const fetchCountryMeta = async (req, res, next) => {
    try {
        const countryList = await LoadLogModel.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('COUNTRY')), 'name']
            ]
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
            ]
        });
        res.json(providerList)
    } catch (error) {
        next(error)
    }
}

const fetchCategoryMeta = async (req, res, next) => {
    try {
        const providerList = await CATEGORY.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('CATEGORY')), 'name']
            ]
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