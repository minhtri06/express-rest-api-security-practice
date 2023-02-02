const { User } = require("../models")
const createError = require("http-errors")
const authService = require("./auth-service")

/**
 * Get user by user id
 * @param {number} id
 * @returns {Promise<InstanceType<User>>}
 */
const getUserById = async (id) => {
    return User.findByPk(id)
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<InstanceType<User>>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ where: { email } })
}

/**
 * Check email exists or not
 * @param {string} email
 * @returns {Promise<boolean>}
 */
const checkEmailExists = async (email) => {
    const user = await User.findOne({ where: { email } })
    return user !== null
}

/**
 * Create a user
 * @param {object} userBody
 * @returns {Promise<InstanceType<User>>}
 */
const createUser = async (userBody) => {
    if (await checkEmailExists(userBody.email)) {
        throw createError.BadRequest("Email has been used")
    }
    userBody.passwordHash = authService.hashPassword(password)
    return User.create(userBody)
}

/**
 * Get all users
 * @returns {Promise<Array<InstanceType<User>>>}
 */
const getAllUsers = async () => {
    return User.findAll()
}

/**
 * Update user by id
 * @param {number} id
 * @param {object} updateBody
 * @param {Promise<InstanceType<User>>}
 */
const updateUserById = async (id, updateBody) => {
    const user = await User.findByPk(id)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    if (!updateBody.email || (await checkEmailExists(updateBody.email))) {
        throw createError.BadRequest("Email has been used")
    }
    await user.update(updateBody)
    return user
}

const deleteUserById = async (id) => {
    const user = await User.findByPk(id)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    await user.destroy()
    return user
}

const userService = {
    getUserById,
    createUser,
    getUserByEmail,
    getAllUsers,
    updateUserById,
    deleteUserById,
}

module.exports = userService
