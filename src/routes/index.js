const router = require("express").Router()

router.use("/auth", require("./auth-routes"))
router.use("/users", require("./user-routes"))
router.use("/decks", require("./deck-routes"))

module.exports = router
