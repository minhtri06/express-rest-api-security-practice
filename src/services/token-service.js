const jwt = require("jsonwebtoken")
const moment = require("moment")
const envConfig = require("../config/env-config")

const generateToken = (userId, expires, type) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, envConfig.jwt.SECRET_KEY)
}

module.exports = {
    generateToken,
}
