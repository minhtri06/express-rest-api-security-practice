const router = require("express").Router()
const { userController } = require("../controllers")
const validate = require("../middlewares/validate")
const { userValidator } = require("../validators")

router.route("/").get(validate(userValidator.getUsers), userController.getUsers)

module.exports = router
