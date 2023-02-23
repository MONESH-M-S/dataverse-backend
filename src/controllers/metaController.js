const CountryMetaModel = require("../models/countryMeta.model");
const ProviderMetaModel = require("../models/providerMeta.model");

const fetchCountryMeta = async (req, res, next) => {
    try {
        const countryList = await CountryMetaModel.findAll()
        res.json(countryList)
    } catch (error) {
        next(error)
    }
}

const fetchProviderMeta = async (req, res, next) => {
    try {
        const providerList = await ProviderMetaModel.findAll()
        res.json(providerList)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchCountryMeta,
    fetchProviderMeta
}