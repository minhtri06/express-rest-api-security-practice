"use strict"

const { Sequelize } = require("sequelize")
const envConfig = require("../config/env-config")
const dbConfig = envConfig.db[envConfig.NODE_ENV]

let sequelize
sequelize = new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USERNAME,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        logging: dbConfig.LOGGING,
        raw: true,
    }
)

const User = require("./user")(sequelize)
const RefreshToken = require("./refresh-token")(sequelize)

const db = { User, RefreshToken }

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
