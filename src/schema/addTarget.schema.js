const Joi = require("joi");

module.exports = Joi.object({
    target: Joi.string().required(),
    source: Joi.string().required(),
})