const { Cart, CartBook, Book, User } = require("../db");

const addToCart = async (req, res) => {

    const { userId, bookId } = req.body;

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

        const cartBook = await CartBook.findOne({
            where: { cartId: cart.id, bookId: bookId }
        });

        if (cartBook) {
            return res.status(400).json({ message: "Libro ya está en el carrito" });
        } else {
            await CartBook.create({
                cartId: cart.id,
                bookId: bookId,
            });
            const bookDetails = await Book.findByPk(bookId);

            return res.status(200).json({
                message: "Artículo agregado al carrito",
                book: bookDetails
            });
        }
    } catch (error) {
        console.error("Error al agregar al carrito:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

const removeItems = async (req, res) => {
    
    const { userId, bookId } = req.body;
    console.log('Datos recibidos en el endpoint /remove:', { userId, bookId });
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const cart = await Cart.findOne({
            where: { status: "Activo" }
        });

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const cartBook = await CartBook.findOne({
            where: { cartId: cart.id, bookId: bookId }
        });

        if (!cartBook) {
            return res.status(404).json({ message: "Libro no encontrado en el carrito" });
        }

        await cartBook.destroy();

        return res.status(200).json({ message: "Libro eliminado del carrito" });
    } catch (error) {
        console.error("Error al eliminar del carrito:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

const emptyCart = async (req, res) => {
    const { userId } = req.body;
    try {
        let cartWithItems = await Cart.findOne({
            where: { userId, status: "Activo" }
        });
        if (!cartWithItems) {
            return res.status(404).json({ message: "No se encontró el carrito" });
        }

        await CartBook.destroy({
            where: { cartId: cartWithItems.id }
        });

        return res.status(200).json({ message: "Carrito vaciado exitosamente" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
}

module.exports = { addToCart, removeItems, emptyCart };