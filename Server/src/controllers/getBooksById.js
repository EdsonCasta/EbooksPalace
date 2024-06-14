const { Book } = require("../db");

const booksById = async (req, res) => {
    try {
        const { id } = req.params;

        const getBookById = await Book.findByPk(id);

        if (!getBookById) return res.status(400).json({ error: 'No se encontró el libro' });

        return res.status(200).json(getBookById);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = booksById;

