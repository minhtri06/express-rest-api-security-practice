const userService = require("./user-services")
const tokenService = require("./token-service")
const createError = require("http-errors")

const register = async (userBody) => {
    userBody.role = "user"
    const user = await userService.createUser(userBody)
    const authTokens = await tokenService.createAuthTokens(user.id)
    return { user, authTokens }
}

/**
 *
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

module.exports = { register, login }
