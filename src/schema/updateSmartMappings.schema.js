const Joi = require("joi");

module.exports = Joi.object({
    mapping: Joi.array().items({
        source: Joi.string().required(),
        target: Joi.string().required(),
    })
})
