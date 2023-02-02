const createError = require("http-errors")
const { commonConstants } = require("../utils")

const validate = (schema) => (req, res, next) => {
    for (let prop of [
        commonConstants.BODY,
        commonConstants.QUERY,
        commonConstants.PARAMS,
    ]) {
        if (!schema[prop]) {
            continue
        }
        const { error } = schema[prop].validate(req[prop], {
            errors: {
                wrap: {
                    label: "'",
                },
            },
        })
        if (error) {
            next(
                new createError.BadRequest(
                    `Request (${prop}) error: ${error.message}`
                )
            )
        }
    }

    return next()
}

module.exports = validate
