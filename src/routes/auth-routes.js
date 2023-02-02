const router = require("express").Router()
const validate = require("../middlewares/validate")
const { authValidator } = require("../validators")
const { authController } = require("../controllers")

router.post("/login", validate(authValidator.login), authController.login)
router.post(
    "/register",
    validate(authValidator.register),
    authController.registerUser
)

module.exports = router
