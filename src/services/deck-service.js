const createError = require("http-errors")
const { Deck } = require("../models")
const { Op } = require("sequelize")
const { handleQueryNumericFilters } = require("../utils")
const userService = require("./user-service")

/**
 * Query deck
 * @param {object} reqQuery
 * @param {string} [reqQuery.name]
 * @param {number} [reqQuery.ownerId]
 * @param {string} [reqQuery.numericFilters]
 * @returns {Promise<InstanceType<Deck>>}
 */
const queryDeck = async (reqQuery) => {
    const queryOptions = { where: {} }

    if (reqQuery.ownerId) {
        queryOptions.where.ownerId = reqQuery.ownerId
    }
    if (reqQuery.name) {
        queryOptions.where.name = { [Op.like]: `%${reqQuery.name}%` }
    }
    if (reqQuery.numericFilters) {
        Object.assign(queryOptions.where, reqQuery.numericFilters)
    }

    return Deck.findAll(queryOptions)
}

/**
 *
 * @param {object} deckBody
 * @returns {Promise<InstanceType<Deck>>}
 */
const createDeck = async (deckBody) => {
    if (!deckBody.ownerId || !(await userService.checkExistById(deckBody.ownerId))) {
        throw createError.NotFound("Cannot found owner of deck")
    }
    return Deck.create(deckBody)
}

module.exports = { queryDeck, createDeck }
