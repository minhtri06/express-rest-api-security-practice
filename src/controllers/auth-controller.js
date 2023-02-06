const { authService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const registerUser = async (req, res) => {
    const { user, authTokens } = await authService.register(req.body)
    return res.status(StatusCodes.CREATED).json({ user, authTokens })
}

/** @type {import("express").RequestHandler} */
const login = async (req, res) => {
    const { email, password } = req.body
    const { user, authTokens } = await authService.login(email, password)
    return res.json({ message: "Login successfully", user, authTokens })
}

/** @type {import("express").RequestHandler} */
const logout = async (req, res) => {
    await authService.logout(req.body.refreshToken)
    return res.json({ message: "Logout successfully" })
}

module.exports = { registerUser, login, logout }
