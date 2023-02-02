"use strict"
const { Model } = require("sequelize")
const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    class RefreshToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
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
    return RefreshToken
}
