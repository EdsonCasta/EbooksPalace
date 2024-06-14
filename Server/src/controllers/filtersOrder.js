const { Book } = require('../db');

const sortTemplatesAlphabetically = async (req, res) => {
    try {
        const { order } = req.params;

        const books = await Book.findAll();
        
        const sortedTemplates = books.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return order === 'desc' ? 1 : -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return order === 'desc' ? -1 : 1;
            return 0;
        });

        res.status(200).json(sortedTemplates);
        
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const filterByPrice = async (req, res) => {
    try {
        const { sort } = req.query;

        const books = await Book.findAll();

        if (sort === 'asc') {
            books.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            books.sort((a, b) => b.price - a.price);
        }

        if (books.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos que coincidan con el filtro." });
        }

        res.status(200).json(books);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { sortTemplatesAlphabetically, filterByPrice };