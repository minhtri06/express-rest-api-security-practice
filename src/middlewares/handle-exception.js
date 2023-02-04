const envConfig = require("../config/env-config")
const createError = require("http-errors")
const { PRODUCTION } = require("../utils").commonConstants

const handleException = async (err, req, res, next) => {
    if (envConfig.NODE_ENV !== PRODUCTION) {
        console.log(err)
        const statusCode = err instanceof createError.HttpError ? err.statusCode : 500
        return res.status(statusCode).json({ error: err.message })
    } else {
        return res.status(500).json({ message: "Something went wrong, please try again" })
    }
}

module.exports = handleException
