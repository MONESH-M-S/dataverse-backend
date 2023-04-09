const Joi = require("joi");

module.exports = Joi.object({
    mappings: Joi.array().items({
        ID: Joi.number().required(),
        SourceColumn: Joi.string().allow("").required(),
        TargetColumn: Joi.string().required()
    })
})