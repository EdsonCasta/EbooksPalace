const { Book } = require('../db');

const getCategories = async (req, res) => {
    try {
        const categories = await Book.findAll();

        const mapCategories = [...new Set(categories.map(book => book.category))];

        res.json(mapCategories);
    } catch (error) {
        console.error("Error al obtener categorías:", error.message);
        res.status(500).json({ error: "Error al obtener categorías" });
    }
};

module.exports = {
    getCategories
};
