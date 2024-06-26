const { Cart, User, Book, CartBook } = require("../db");

const getAllCarts = async (req, res) => {
    try {
        const getCarts = await Cart.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Book,
                    through: { attributes: [] }, 
                    attributes: ['id', 'name', 'price', 'image']
                },
                {
                    model: CartBook,
                    include: [
                        {
                            model: Book,
                            attributes: ['id', 'name', 'price', 'image']
                        }
                    ]
                }
            ]
        });

        if (!getCarts || getCarts.length === 0) {
            return res.status(400).json({ message: "No se encontraron carritos" });
        }

        return res.status(200).json(getCarts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCarts
};
