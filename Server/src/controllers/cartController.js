const { ShoppingCart, Book } = require("../models");

const addToCart = async (req, res) => {
    try {
        const { userId, bookId, amount } = req.body;

        let cartItem = await ShoppingCart.findOne({ where: { userId, bookId } });

        if (cartItem) {
            cartItem.amount += amount;
            await cartItem.save();
        } else {
            cartItem = await ShoppingCart.create({ userId, bookId, amount });
        }

        return res.status(200).json({ message: "Artículo agregado al carrito", cartItem });
    } catch (error) {
        console.error("Error al agregar al carrito:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const cartItem = await ShoppingCart.findByPk(id);

        if (!cartItem) {
            return res.status(404).json({ message: "Artículo no encontrado en el carrito" });
        }

        cartItem.amount = amount;
        await cartItem.save();

        return res.status(200).json({ message: "Cantidad actualizada", cartItem });
    } catch (error) {
        console.error("Error al actualizar el carrito:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cartItems = await ShoppingCart.findAll({
            where: { userId },
            include: [Book]
        });

        return res.status(200).json({ cartItems });
    } catch (error) {
        console.error("Error al obtener el carrito:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

module.exports = { addToCart, updateCartItem, getCart };
