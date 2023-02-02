const { userService } = require("../services")
const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

const getAllUsers = async (req, res) => {}

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
const createUserTest = async (req, res) => {}
const updateUserById = async (req, res) => {}
const deleteUserById = async (req, res) => {}

module.exports = {
    getAllUsers,
    getUserById,
}
