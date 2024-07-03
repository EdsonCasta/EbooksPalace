const { Cart, Book, CartBook } = require('../db');

const getTransHistory = async (req, res) => {
    const { userId } = req.params;

    try {
        const transHistory = await Cart.findAll({
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

        const transactionHistory = transHistory.map(cart => ({
            cartId: cart.id,
            amount: cart.amount,
            purchaseDate: cart.createdAt,
            books: cart.books.map(book => ({
                id: book.id,
                name: book.name,
                image: book.image,
                price: book.price
            }))
        }));

        res.json(transactionHistory);
    } catch (error) {
        console.error('Error al buscar libros en carritos pagados:', error);
        res.status(500).json({ error: 'Error al buscar libros en carritos pagados' });
    }
};

module.exports = {
    getTransHistory
};
