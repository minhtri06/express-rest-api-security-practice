const router = require("express").Router()
const { userController } = require("../controllers")
const { userValidator } = require("../validators")
const validate = require("../middlewares/validate")

router
    .route("/")
    .get(validate(userValidator.getUsers), userController.getUsers)
    .post(validate(userValidator.createUser), userController.createUser)
router
    .route("/:userId")
    .get(validate(userValidator.getUserById), userController.getUserById)
    .patch(validate(userValidator.updateUserById), userController.updateUserById)

module.exports = router
