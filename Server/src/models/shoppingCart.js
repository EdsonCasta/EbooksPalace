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
            },
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM("Activo", "Pagado"),
            defaultValue: "Activo"
        }
    }, {
        hooks: {
            afterUpdate: async (shoppingCart, options) => {
                console.log(shoppingCart)
                if (shoppingCart.status === "Pagado") {
                    await sequelize.models.shoppingCart.create({
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