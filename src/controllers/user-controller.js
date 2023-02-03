const { userService } = require("../services")
const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")
const { pick } = require("../utils")

const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.userId)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    return res.status(StatusCodes.OK).json({
        message: "Get user successfully",
        user,
    })
}

const getUsers = async (req, res) => {
    const filters = pick(req.query, ["name"])
    const options = pick(req.query, ["sortBy", "limit", "page", "attributes"])
    const users = await userService.queryUsers(filters, options)
    return res.status(StatusCodes.OK).json({
        message: "Get users successfully",
        users,
    })
}

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body)
    return res
        .status(StatusCodes.CREATED)
        .json({ message: "User create successfully", user })
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
}
