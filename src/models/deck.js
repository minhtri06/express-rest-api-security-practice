"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class Deck extends Model {
    static associate({ User }) {
        this.belongsTo(User, {
            foreignKey: "ownerId",
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

Deck.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        total: { type: DataTypes.INTEGER, allowNull: false },
        ownerId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: "Deck",
    }
)

module.exports = Deck
