const jwt = require("jsonwebtoken")
const createError = require("http-errors")
const userService = require("./user-services")
const tokenService = require("./token-service")
const blacklistUserService = require("./blacklist-user-service")
const envConfig = require("../config/env-config")
const { ACCESS, REFRESH } = require("../utils").commonConstants

const register = async (userBody) => {
    userBody.role = "user"
    const user = await userService.createUser(userBody)
    const authTokens = await tokenService.createAuthTokens(user.id)
    return { user, authTokens }
}

/**
 * Login (return user and auth tokens)
 * @param {string} email
 * @param {string} password
 */
const login = async (email, password) => {
    const user = await userService.getUserByEmailAndPassword(email, password)
    if (!user) {
        throw createError.BadRequest("Wrong email or password")
    }
    const authTokens = await tokenService.createAuthTokens(user.id)
    // blackListUsers.delete(user.id)
    blacklistUserService.removeUserFromBlacklist(user.id)
    return { user, authTokens }
}

const loginByGoogle = async (userId) => {
    return tokenService.createAuthTokens(userId)
}

const logout = async (refreshToken) => {
    const rTokenIns = await tokenService.getRefreshTokenByToken(refreshToken)
    if (!rTokenIns) {
        throw createError.NotFound("Not found")
    }
    await rTokenIns.destroy()
}

const refreshAuthTokens = async (refreshToken) => {
    try {
        const [refreshTokenIns, payload] = await tokenService.getRefreshTokenAndVerify(
            refreshToken
        )
        if (!refreshTokenIns) {
            if (payload.type === REFRESH) {
                // blackListUsers.add(payload.sub)
                await blacklistUserService.addUserToBlackList(payload.sub)
                await tokenService.deleteAllRefreshTokensOfAUser(payload.sub)
            }
            throw createError.Unauthorized("Unauthorized")
        }
        const user = await userService.getUserById(payload.sub)
        if (!user) {
            throw new Error(
                "Refresh token has user id, but cannot found user in database"
            )
        }
        await refreshTokenIns.destroy()
        const newAuthTokens = await tokenService.createAuthTokens(payload.sub)
        return [user, newAuthTokens]
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw createError.Unauthorized("Unauthorized")
        }
        throw error
    }
}

module.exports = {
    register,
    login,
    loginByGoogle,
    logout,
    refreshAuthTokens,
}
