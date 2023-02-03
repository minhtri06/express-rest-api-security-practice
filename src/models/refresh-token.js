"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class RefreshToken extends Model {
    static associate({ User }) {
        this.belongsTo(User, {
            foreignKey: "userId",
        })
    }
}

RefreshToken.init(
    {
        token: { type: DataTypes.STRING, allowNull: false },
        expires: { type: DataTypes.DATE, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: "RefreshToken",
        indexes: [
            {
                using: "BTREE",
                fields: ["token"],
            },
        ],
    }
)

module.exports = RefreshToken
