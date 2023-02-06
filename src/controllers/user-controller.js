const createError = require("http-errors")
const { userService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getUsers = async (req, res) => {
    const users = await userService.getUsers(req.query)
    return res.json({ users })
}

/** @type {import("express").RequestHandler} */
const createUser = async (req, res) => {
    const user = await userService.createUser(req.body)
    return res.status(StatusCodes.CREATED).json({ user })
}

/** @type {import("express").RequestHandler} */
const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.userId)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    return res.status(StatusCodes.OK).json({ user })
}

const updateUser = async (req, res) => {}

module.exports = { getUsers, createUser, getUserById, updateUser }
