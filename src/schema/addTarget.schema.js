const Joi = require("joi");

module.exports = Joi.array().items({
    fileName: Joi.string().required(),
    id: Joi.string().required(),
    target: Joi.string().required(),
    source: Joi.string().allow("")
})