const { DataTypes } = require("sequelize");

const user = (sequelize) => {
    return sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("Administrator", "Customer"),
            defaultValue: "Customer"
        }
    },
        { timestamps: true }
    );
};

module.exports = user;