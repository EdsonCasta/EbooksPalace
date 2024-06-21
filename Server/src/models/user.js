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
            type: DataTypes.ENUM("Administrator", "Customer", "Banned"),
            defaultValue: "Customer"
        },
    }, {
        timestamps: true,
        /* hooks: {
            afterCreate: async (user, options) => {
                const ShoppingCart = sequelize.models.ShoppingCart;
                await ShoppingCart.create({
                    userId: user.id
                });
            }
        } */
    });

    return Users;
};

module.exports = user;