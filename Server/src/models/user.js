const { DataTypes } = require("sequelize");

const user = (sequelize) => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
            type: DataTypes.ENUM("Administrador", "Cliente", "Baneado"),
            defaultValue: "Cliente"
        },
    }, {
        timestamps: true,
        hooks: {
            afterCreate: async (user, options) => {
                console.log('Usuario creado:', user.id);
                const ShoppingCart = sequelize.models.shoppingCart;
                if (ShoppingCart) {
                    await ShoppingCart.create({
                        userId: user.id,
                        status: "Activo"
                    });
                } else {
                    console.error("ShoppingCart model not found.");
                }
            }
        }
    });

    return User;
};

module.exports = user;