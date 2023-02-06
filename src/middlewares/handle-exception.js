const envConfig = require("../config/env-config")
const createError = require("http-errors")
const { PRODUCTION } = require("../utils").commonConstants

const handleException = async (err, req, res, next) => {
    const statusCode = err instanceof createError.HttpError ? err.statusCode : 500
    if (envConfig.NODE_ENV !== PRODUCTION) {
        console.log(err)
        return res.status(statusCode).json({ error: err.message })
    } else {
        return res.status(statusCode).json({})
    }
}

module.exports = handleException
