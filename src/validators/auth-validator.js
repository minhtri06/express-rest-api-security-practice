const Joi = require("joi")

const login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
    }),
}

const register = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30).required(),
        name: Joi.string().required(),
    }),
}

module.exports = {
    login,
    register,
}
