const DataTypes = require("sequelize");

const shoppingCart = (sequelize) => {
    return sequelize.define("shoppingCart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id",
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Activo", "Pagado"),
            defaultValue: "Activo"
        }
    }, {
        hooks: {
            afterUpdate: async (shoppingCart, options) => {
                if (shoppingCart.status === "Pagado") {
                    await ShoppingCart.create({
                        userId: shoppingCart.userId,
                        status: "Activo"
                    });
                }
            }
        }
    });
    return ShoppingCart;
};

module.exports = shoppingCart;