const customValidation = require("./custom-validation")
const Joi = require("joi")

const commonElements = {
    user: {
        password: Joi.string().alphanum().min(6).max(30),
        email: Joi.string().email(),
        role: Joi.string().valid("user", "admin", "mod"),
    },
    query: {
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        attributes: Joi.string()
            .regex(/^[a-zA-Z0-9,]{1,}$/)
            .custom(customValidation.query.attributes),

        sortBy: (fields) =>
            Joi.string()
                .regex(/^[a-zA-Z0-9,\-]{1,}$/)
                .custom(customValidation.query.sortBy(fields)),
    },
}
module.exports = commonElements
