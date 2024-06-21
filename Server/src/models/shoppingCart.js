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
                    const ShoppingCart = sequelize.models.ShoppingCart;
                    await ShoppingCart.create({
                        userId: shoppingCart.userId,
                        status: "Activo"
                    })
                }
            }
        }
    })
    return newCart;
}
module.exports = {
    shoppingCart
}