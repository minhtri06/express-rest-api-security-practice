"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class User extends Model {
    static associate({ RefreshToken, BlacklistUser }) {
        this.hasMany(RefreshToken, {
            foreignKey: "userId",
        })
        this.hasOne(BlacklistUser, {
            foreignKey: "userId",
        })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            passwordHash: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            role: undefined,
        }
    }
}

User.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING },
        avatar: DataTypes.STRING,
        googleId: { type: DataTypes.STRING },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        sequelize,
        modelName: "User",
        indexes: [
            {
                unique: true,
                fields: ["email"],
            },
        ],
    }
)

module.exports = User
