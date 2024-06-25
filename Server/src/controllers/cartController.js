const { Cart, CartBook, Book, User } = require("../db");

const addToCart = async (req, res) => {
    // const userId = req.users.id; 
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

module.exports = { addToCart };
