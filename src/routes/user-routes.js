const router = require("express").Router()
const { userController } = require("../controllers")
const { userValidator } = require("../validators")
const validate = require("../middlewares/validate")

router.route("/").get(userController.getAllUsers)
router
    .route("/:userId")
    .get(validate(userValidator.getUserById), userController.getUserById)

module.exports = router
