const Joi = require("joi");

module.exports = Joi.object({
    id_list: Joi.array().items(Joi.number())
})