const { StatusCodes } = require("http-status-codes")
const { authService } = require("../services")

const registerUser = async (req, res) => {
    const { email, password, name } = req.body

    const user = await authService.registerUser(name, email, password)
    return res.status(StatusCodes.OK).json({ user })
}

const login = async (req, res) => {
    res.send()
}

module.exports = {
    login,
    registerUser,
}
