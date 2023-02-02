const envConfig = require("../config/env-config")
const createError = require("http-errors")
const { commonConstants } = require("../utils")

const handleException = async (err, req, res, next) => {
    if (envConfig.NODE_ENV !== commonConstants.PRODUCTION) {
        const statusCode =
            err instanceof createError.HttpError ? err.statusCode : 500

        return res.status(statusCode).json({ error: err.message })
    } else {
        return res
            .status(500)
            .json({ message: "Something went wrong, please try again" })
    }
}

module.exports = handleException
