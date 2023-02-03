const Joi = require("joi")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const login = {
    [BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
    }),
}

const register = {
    [BODY]: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        name: Joi.string().required(),
    }),
}

module.exports = {
    login,
    register,
}
