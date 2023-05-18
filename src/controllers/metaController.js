const LoadLogModel = require("../models/loadLog.model");
const { Sequelize } = require("../../models");

const fetchCountryMeta = async (req, res, next) => {
  const { category } = req.query;

  const whereClause = {
    SOURCE: "Nielsen",
  };

  if (category) whereClause["CATEGORY"] = category;

  try {
    const countryList = await LoadLogModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("COUNTRY")), "name"],
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
    const providerList = await LoadLogModel.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("SOURCE")), "name"]],
      where: {
        SOURCE: "Nielsen",
      },
    });
    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

const fetchCategoryMeta = async (req, res, next) => {
  const { country } = req.query;

  const whereClause = {
    SOURCE: "Nielsen",
  };

  if (country) whereClause["COUNTRY"] = country;

  try {
    const providerList = await LoadLogModel.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("CATEGORY")), "name"],
      ],
      where: whereClause,
    });
    res.json(providerList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchCountryMeta,
  fetchProviderMeta,
  fetchCategoryMeta,
};
