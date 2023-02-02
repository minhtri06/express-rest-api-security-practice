const Joi = require("joi")
const { commonConstants } = require("../utils")

const getUserById = {
    [commonConstants.PARAMS]: Joi.object().keys({
        userId: Joi.number().required(),
    }),
}

const userValidator = {
    getUserById,
}

module.exports = userValidator
