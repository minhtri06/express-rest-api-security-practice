const { User } = require("../models")
const { Op } = require("sequelize")
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

const checkExistById = async (userId) => {
    const user = await User.findByPk(userId)
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
    userBody.passwordHash = authService.hashPassword(userBody.password)
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
 * Query users
 * @param {object} filters
 * @param {string} [filters.name]
 * @param {object} options
 * @param {string} [options.sortBy]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 * @param {string} [options.attributes]
 * @returns {Promise<InstanceType<User>[]>}
 */
const queryUsers = async (filters = {}, options = {}) => {
    const queryObj = { where: {} }
    if (filters.name) {
        queryObj.where.name = { [Op.like]: `%${filters.name}%` }
    }
    if (options.attributes) {
        queryObj.attributes = options.attributes.split(",")
    }
    queryObj.limit = options.limit || 10
    const page = options.page || 1
    queryObj.offset = (page - 1) * queryObj.limit

    return await User.findAll(queryObj)
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
    if (updateBody.email && (await checkEmailExists(updateBody.email))) {
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
    checkExistById,
    createUser,
    getUserByEmail,
    getAllUsers,
    queryUsers,
    updateUserById,
    deleteUserById,
}

module.exports = userService
