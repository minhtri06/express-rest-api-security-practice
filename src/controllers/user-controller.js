const { userService } = require("../services")

/** @type {import("express").RequestHandler} */
const getUsers = async (req, res) => {
    const users = await userService.getUsers(req.query)
    return res.json({ message: "Get users successfully", users })
}

module.exports = { getUsers }
