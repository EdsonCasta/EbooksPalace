const DataTypes = require("sequelize");

const shoppingCart = (sequelize) => {
    return sequelize.define("ShoppingCart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: user,
                key: "id",
            }
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: book,
                key: "id",
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    })
}
module.exports = {
    shoppingCart
}