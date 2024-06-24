const { DataTypes } = require("sequelize");

const cart = (sequelize) => {
    return sequelize.define("cart", {
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
        status: {
            type: DataTypes.ENUM("Activo", "Pagado"),
            defaultValue: "Activo"
        }
    }, {
        hooks: {
            afterUpdate: async (cart, options) => {
                if (cart.status === "Pagado") {
                    await sequelize.models.cart.create({
                        userId: cart.userId,
                        status: "Activo"
                    });
                }
            }
        }
    });
};

module.exports = cart;