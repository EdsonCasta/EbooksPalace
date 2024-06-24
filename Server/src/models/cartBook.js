const { DataTypes } = require("sequelize");

const cartBook = (sequelize) => {
    return sequelize.define("cartBook", {
        cartId: {
            type: DataTypes.INTEGER,
            references: {
                model: "carts",
                key: "id",
            },
            allowNull: false
        },
        bookId: {
            type: DataTypes.INTEGER,
            references: {
                model: "books",
                key: "id",
            },
            allowNull: false
        },
    }, {
        timestamps: true
    });
};

module.exports = cartBook;
