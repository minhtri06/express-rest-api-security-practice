require("express-async-errors")

const express = require("express")
const cors = require("cors")
const logger = require("morgan")
const router = require("./routes")
const db = require("./models")
const handleNotFound = require("./middlewares/handle-not-found")
const handleException = require("./middlewares/handle-exception")
const envConfig = require("./config/env-config")

const app = express()

app.use(logger("dev"))

app.use(
    cors({
        origin: envConfig.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
)

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use("/api/v1/", router)

app.use(handleNotFound)
app.use(handleException)

const start = async () => {
    try {
        await db.sequelize.sync()
        app.listen(
            envConfig.PORT,
            console.log("😏 Server is running on port " + envConfig.PORT)
        )
    } catch (error) {
        console.log(error)
    }
}

start()
