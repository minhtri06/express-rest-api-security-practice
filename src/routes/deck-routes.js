const router = require("express").Router()
const { deckController } = require("../controllers")
const validate = require("../middlewares/validate")
const { deckValidator } = require("../validators")

router
    .route("/")
    .get(validate(deckValidator.getDecks), deckController.getDecks)
    .post(validate(deckValidator.createDeck), deckController.createDeck)

module.exports = router
