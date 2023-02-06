const { Op } = require("sequelize")
const { User } = require("../models")

/**
 *
 * @param {object} options
 * @param {string} [options.name]
 * @param {[]} [options.sortBy]
 * @param {string[]} [options.attributes]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 */
const getUsers = async ({ name, sortBy, attributes, limit, page }) => {
    const queryOptions = { where: {} }

    if (name) {
        queryOptions.where.name = { [Op.like]: `%${name}%` }
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

module.exports = { getUsers }
