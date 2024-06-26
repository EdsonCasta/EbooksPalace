const { User, Cart, Book } = require("../db");

const getUserCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId, {
            include: [{
                model: Cart,
                where: { status: "Activo" },
                include: [{
                    model: Book,
                    through: {
                        attributes: []
                    }
                }]
            }]
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const cart = user.carts[0];

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        return res.status(200).json({ user, cart });
    } catch (error) {
        console.error("Error al obtener el carrito del usuario:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

module.exports = getUserCart;
