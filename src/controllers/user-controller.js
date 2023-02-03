const { userService } = require("../services")
const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
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

/** @type {import("express").RequestHandler} */
const getUsers = async (req, res) => {
    const users = await userService.queryUsers(req.query)
    return res.status(StatusCodes.OK).json({
        message: "Get users successfully",
        users,
    })
}

/** @type {import("express").RequestHandler} */
const createUser = async (req, res) => {
    const user = await userService.createUser(req.body)
    return res
        .status(StatusCodes.CREATED)
        .json({ message: "User create successfully", user })
}

/** @type {import("express").RequestHandler} */
const updateUserById = async (req, res) => {
    const { userId } = req.params
    await userService.updateUserById(userId, req.body)
    return res.status(StatusCodes.OK).json({
        message: "Update user successfully",
    })
}

module.exports = {
    getUserById,
    getUsers,
    createUser,
    updateUserById,
}
