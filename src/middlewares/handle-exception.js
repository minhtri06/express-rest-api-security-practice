const envConfig = require("../config/env-config")
const createError = require("http-errors")
const { PRODUCTION } = require("../utils").commonConstants

const handleException = async (err, req, res, next) => {
    const [statusCode, message] =
        err instanceof createError.HttpError
            ? [err.statusCode, err.message]
            : [500, "Something went wrong"]
    if (envConfig.NODE_ENV !== PRODUCTION) {
        if (!(err instanceof createError.HttpError)) {
            console.log(err)
        }
        return res.status(statusCode).json({ error: message })
    } else {
        return res.status(statusCode).json({ error: message })
    }
}

module.exports = handleException
