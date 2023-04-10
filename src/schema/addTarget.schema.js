const Joi = require("joi");

module.exports = Joi.array().items({
    id: Joi.number().optional(),
    key: Joi.number().optional(),
    target: Joi.string().required(),
    source: Joi.string().allow("")
})