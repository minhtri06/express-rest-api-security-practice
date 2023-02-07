const jwt = require("jsonwebtoken")
const moment = require("moment")
const createError = require("http-errors")
const { RefreshToken } = require("../models")
const { REFRESH, ACCESS } = require("../utils").commonConstants
const { SECRET_KEY, REFRESH_EXPIRATION_DAYS, ACCESS_EXPIRATION_MINUTES } =
    require("../config/env-config").jwt

/**
 * generate access token
 * @param {number} userId
 * @returns {Promise<string>}
 */
const generateToken = (userId, expires, type) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, SECRET_KEY)
}

/**
 * Create access token
 * @param {number} userId
 * @returns {Promise<string>}
 */
const createAccessToken = (userId) => {
    const expires = moment().add(ACCESS_EXPIRATION_MINUTES, "minutes")
    return `Bearer ${generateToken(userId, expires, ACCESS)}`
}

/**
 * create refresh token
 * @param {number} userId
 * @returns {Promise<InstanceType<RefreshToken>>}
 */
const createRefreshToken = async (userId) => {
    const expires = moment().add(REFRESH_EXPIRATION_DAYS, "days")
    const token = generateToken(userId, expires, REFRESH)
    return RefreshToken.create({ token, userId, expires: expires.toDate() })
}

/**
 *
 * @param {number} userId
 * @returns {object}
 */
const createAuthTokens = async (userId) => {
    const accessToken = createAccessToken(userId)
    const refreshTokenIns = await createRefreshToken(userId)
    return { accessToken, refreshToken: refreshTokenIns.token }
}

const getRefreshTokenByToken = async (token) => {
    return RefreshToken.findOne({ where: { token } })
}

/**
 * Get refresh token and verify
 * @param {string} token
 * @returns {Promise<[InstanceType<RefreshToken>, object]>}
 */
const getRefreshTokenAndVerify = async (token) => {
    const payload = jwt.verify(token, SECRET_KEY)
    if (payload.type !== REFRESH) {
        return [null, payload]
    }
    const refreshToken = await RefreshToken.findOne({
        where: { token, userId: payload.sub },
    })
    return [refreshToken, payload]
}

/**
 * Delete all refresh tokens of a user
 * @param {number} userId
 * @returns {Promise}
 */
const deleteAllRefreshTokensOfAUser = async (userId) => {
    RefreshToken.destroy({ where: { userId } })
}

const tokenService = {
    createAccessToken,
    createRefreshToken,
    createAuthTokens,
    getRefreshTokenByToken,
    getRefreshTokenAndVerify,
    deleteAllRefreshTokensOfAUser,
}

module.exports = tokenService
