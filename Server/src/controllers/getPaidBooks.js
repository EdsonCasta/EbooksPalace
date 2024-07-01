const { Cart, Book, CartBook } = require('../db');

const getPaidBooks = async (req, res) => {

    const { userId } = req.params;

    try {
        const paidCarts = await Cart.findAll({
            where: {
                status: "Pagado",
                userId: userId
            },
            include: [
                {
                    model: Book,
                    through: {
                        model: CartBook,
                        attributes: []
                    }
                }
            ]
        });

        const booksInCart = paidCarts.flatMap(cart => cart.books);

        res.json(booksInCart);
    } catch (error) {
        console.error('Error al buscar libros en carritos pagados:', error);
        res.status(500).json({ error: 'Error al buscar libros en carritos pagados' });
    }
}

module.exports = {
    getPaidBooks
}