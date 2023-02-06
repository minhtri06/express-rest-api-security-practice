const { Op } = require("sequelize")
const createError = require("http-errors")
const bcrypt = require("bcryptjs")
const { User } = require("../models")

/**
 *
 * @param {string} password
 * @returns {string}
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash("B4c0//", salt)
}

/**
 * Get users by query option
 * @param {object} options
 * @param {string} [options.name]
 * @param {string} [options.role]
 * @param {[]} [options.sortBy]
 * @param {string[]} [options.attributes]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 */
const getUsers = async ({ name, role, sortBy, attributes, limit, page }) => {
    const queryOptions = { where: {} }

    if (name) {
        queryOptions.where.name = { [Op.like]: `%${name}%` }
    }
    if (role) {
        queryOptions.where.role = role
    }
    if (sortBy) {
        queryOptions.order = sortBy
    }
    if (attributes) {
        queryOptions.attributes = attributes
    }
    queryOptions.limit = limit || 10
    page = page || 1
    queryOptions.offset = (page - 1) * queryOptions.limit

    return User.findAll(queryOptions)
}

/**
 * Get all users
 * @returns {Promise<InstanceType<User>[]>}
 */
const getAllUsers = async () => {
    User.findAll()
}

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<InstanceType<User>>}
 */
const getUserById = async (id) => {
    return User.findByPk(id)
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<InstanceType<User>|null>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ where: { email } })
}

/**
 * Check email exists or not
 * @param {string} email
 * @returns {Promise<Boolean>}
 */
const checkEmailExist = async (email) => {
    const user = await getUserByEmail(email)
    return user !== null
}

/**
 *
 * @param {object} userBody
 * @param {string} [userBody.name]
 * @param {string} [userBody.email]
 * @param {string} [userBody.password]
 * @param {string} [userBody.avatar]
 * @param {string} [userBody.role]
 */
const createUser = async (userBody) => {
    if (await checkEmailExist(userBody.email)) {
        throw createError.BadRequest("Email has been used")
    }
    userBody.passwordHash = await hashPassword(userBody.password)
    return User.create(userBody)
}

module.exports = {
    hashPassword,
    getUsers,
    getAllUsers,
    getUserById,
    getUserByEmail,
    checkEmailExist,
    createUser,
}