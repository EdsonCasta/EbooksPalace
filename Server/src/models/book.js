const { DataTypes } = require("sequelize");

const book = (sequelize) => {
    return sequelize.define("book", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        editorial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM("Terror", "Comedy", "Romance", "Education", "Self-Help"),
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        { timestamps: true }
    );
};

module.exports = book;