"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class BlacklistUser extends Model {
    static associate({ User }) {
        this.belongsTo(User, {
            foreignKey: "userId",
        })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            createdAt: undefined,
            updatedAt: undefined,
        }
    }
}

BlacklistUser.init(
    {
        userId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    },
    {
        sequelize,
        modelName: "BlacklistUser",
    }
)

module.exports = BlacklistUser
