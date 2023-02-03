const { deckService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getDecks = async (req, res) => {
    const users = await deckService.queryDeck(req.query)
    return res.json({
        message: "Get users successfully",
        users,
    })
}

/** @type {import("express").RequestHandler} */
const createDeck = async (req, res) => {
    const deck = await deckService.createDeck(req.body)
    return res.status(StatusCodes.CREATED).json({
        message: "Create deck successfully",
        deck,
    })
}

module.exports = { getDecks, createDeck }
