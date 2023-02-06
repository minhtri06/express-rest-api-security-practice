const router = require("express").Router()
const { userController } = require("../controllers")
const validate = require("../middlewares/validate")
const { userValidator } = require("../validators")

router
    .route("/")
    .get(validate(userValidator.getUsers), userController.getUsers)
    .post(validate(userValidator.createUser), userController.createUser)
router
    .route("/:userId")
    .get(validate(userValidator.getUserById), userController.getUserById)

module.exports = router
