const Joi = require("joi")
const customValidators = require("./custom")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getUserById = {
    [PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
}

const getUsers = {
    [QUERY]: Joi.object({
        name: Joi.string(),
        sortBy: Joi.string().custom(customValidators.sortBy(["name"])),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        attributes: Joi.string(),
    }),
}

const createUser = {
    [BODY]: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().alphanum().required().min(6).max(30),
    }),
}

const updateUserById = {
    [BODY]: Joi.object({
        name: Joi.string(),
    }),
    [PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
}

const userValidator = {
    getUserById,
    getUsers,
    createUser,
    updateUserById,
}

module.exports = userValidator
