const { RefreshToken } = require("../models")
const createError = require("http-errors")
const jwt = require("jsonwebtoken")
const moment = require("moment")
const envConfig = require("../config/env-config")

const generateToken = (userId, expires) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
    }
    return jwt.sign(payload, envConfig.jwt.SECRET_KEY)
}

const saveRefreshToken = async (token, userId, expires) => {
    return await RefreshToken.create({
        token,
        userId,
        expires: expires.toDate(),
    })
}

const generateAuthToken = async (userId) => {
    const accessTokenExpires = moment().add(
        envConfig.jwt.ACCESS_EXPIRATION_MINUTES,
        "minutes"
    )
    const accessToken = generateToken(userId, accessTokenExpires)

    const refreshTokenExpires = moment().add(
        envConfig.jwt.REFRESH_EXPIRATION_DAYS,
        "days"
    )
    const refreshToken = generateToken(userId, refreshTokenExpires)
    await saveRefreshToken(refreshToken, userId, refreshTokenExpires)

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires,
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires,
        },
    }
}

/**
 *
 * @param {string} token
 * @returns {Promise<InstanceType<RefreshToken>>}
 */
const verifyRefreshToken = async (token) => {
    const payload = jwt.verify(token, JWT_SECRET_KEY)
    const refreshToken = await RefreshToken.findOne({
        token: token,
        userId: payload.sub,
    })
    if (!refreshToken) {
        throw new createError.NotFound(
            "Token verified but not found in database"
        )
    }
    return refreshToken
}

const tokenService = {
    saveRefreshToken,
    generateAuthToken,
    verifyRefreshToken,
}

module.exports = tokenService
