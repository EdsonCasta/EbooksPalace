const { User, ShoppingCart, sequelize } = require("../src/db");

const testCreateUser = async () => {
    try {
        // Crea un nuevo usuario
        const user = await User.create({
            name: "John Doe",
            email: "john@example.com",
            profilePicture: "http://example.com/profile.jpg"
        });

        console.log("Usuario creado:", user);

        // Verifica si se creó el carrito de compras
        const shoppingCart = await ShoppingCart.findOne({ where: { userId: user.id } });

        if (shoppingCart) {
            console.log("Carrito de compras creado:", shoppingCart);
        } else {
            console.log("Carrito de compras no se creó automáticamente.");
        }
    } catch (error) {
        console.error("Error al crear usuario y carrito de compras:", error.message);
    }
};

module.exports = testCreateUser;