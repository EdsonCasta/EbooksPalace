const { Cart, CartBook, Book, User } = require("../db");

const addToCart = async (req, res) => {
    // const userId = req.users.id; 
    const { userId, bookId, amount } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        let [cart, created] = await Cart.findOrCreate({
            where: { userId, status: "Activo" }
        });

        let [cartBook, cartBookCreated] = await CartBook.findOrCreate({
            where: { cartId: cart.id, bookId: bookId },
            defaults: { amount }
        });

        if (!cartBookCreated) {
            cartBook.amount += amount;
            await cartBook.save();
        }

        return res.status(200).json({ message: "Artículo agregado al carrito", cartBook });
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
