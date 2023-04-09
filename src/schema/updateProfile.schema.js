const Joi = require("joi");
const userRoleEnum = require("../models/enums/userRole.enum");

module.exports = Joi.object({
    role: Joi.string().required().valid(
        userRoleEnum.admin,
        userRoleEnum.leadership,
        userRoleEnum.operation,
        userRoleEnum.sme
    ),
    avatar: Joi.string().required()
})