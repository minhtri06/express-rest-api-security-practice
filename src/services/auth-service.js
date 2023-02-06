const jwt = require("jsonwebtoken")
const createError = require("http-errors")
const userService = require("./user-services")
const tokenService = require("./token-service")
const envConfig = require("../config/env-config")

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
    return { user, authTokens }
}

const logout = async (refreshToken) => {
    const rTokenIns = await tokenService.getRefreshTokenByToken(refreshToken)
    if (!rTokenIns) {
        throw createError.NotFound("Not found")
    }
    await rTokenIns.destroy()
}

module.exports = { register, login, logout }
