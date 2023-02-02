const bcrypt = require("bcryptjs")
const createError = require("http-errors")

const { User, RefreshToken } = require("../models")
const tokenService = require("./token-service")

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ where: { email } })
    if (!user || !comparePassword(password, user.passwordHash)) {
        throw new createError.Unauthorized("Incorrect email or password")
    }
    return user
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
    const refreshTokenIns = await RefreshToken.findOne({
        where: { token: refreshToken },
    })
    if (!refreshTokenIns) {
        throw new createError.NotFound("Refresh token not found")
    }
    await refreshTokenIns.destroy()
}

const refreshAuthToken = async (refreshToken) => {
    try {
        const refreshTokenIns = await tokenService.verifyRefreshToken(
            refreshToken
        )
        refreshTokenIns.destroy()
    } catch (error) {}
}

const authService = {
    hashPassword,
    comparePassword,
    loginWithEmailAndPassword,
    logout,
}

module.exports = authService
