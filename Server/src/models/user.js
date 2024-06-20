const { DataTypes } = require("sequelize");

const user = (sequelize) => {
    return sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        profilePicture: {
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