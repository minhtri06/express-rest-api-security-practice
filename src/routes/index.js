const router = require("express").Router()

router.use("/users", require("./user-routes"))
router.use("/auth", require("./auth-routes"))

module.exports = router