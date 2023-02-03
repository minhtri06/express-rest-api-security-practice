const Joi = require("joi")
const customValidators = require("./custom")
const { BODY, QUERY, PARAMS } = require("../utils").commonConstants

const getDecks = {
    [QUERY]: Joi.object().keys({
        name: Joi.string(),
        ownerId: Joi.number().integer(),
        numericFilters: Joi.string().custom(customValidators.numericFilters(["total"])),
    }),
}

const createDeck = {
    [BODY]: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        total: Joi.number().integer().min(0).required(),
        ownerId: Joi.number().integer().required(),
    }),
}

module.exports = { getDecks, createDeck }
