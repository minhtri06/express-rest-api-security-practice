const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const login = {
    [BODY]: Joi.object({
        email: commonElements.user.email.required(),
        password: commonElements.user.password.required(),
    }),
}

const register = {
    [BODY]: Joi.object({
        email: commonElements.user.email.required(),
        password: commonElements.user.password.required(),
        name: commonElements.user.name.required(),
        avatar: commonElements.user.avatar,
    }),
}

module.exports = {
    login,
    register,
}
