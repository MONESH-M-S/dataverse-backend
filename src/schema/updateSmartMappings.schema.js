const Joi = require("joi");

module.exports = Joi.array().items({
    source: Joi.string().required(),
    target: Joi.string().required(),
})