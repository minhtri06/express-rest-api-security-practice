const router = require("express").Router()
const validate = require("../middlewares/validate")
const { authValidator } = require("../validators")
const { authController } = require("../controllers")

router.post("/register", validate(authValidator.register), authController.registerUser)
router.post("/login", validate(authValidator.login), authController.login)

module.exports = router
