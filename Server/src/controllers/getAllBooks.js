const { Book } = require('../db');
const pagination = require('./pagination');
const { filterByEditorial, filterByCategory, filterByAuthor } = require('./filters');

const allBooks = async (req, res) => {

    const { page = 1, productsByPage = 30, editorial, category, author } = req.query;

    try {

        const books = await Book.findAll();

        let filteredBooks = books;

        if (editorial) {
            filteredBooks = filterByEditorial(filteredBooks, editorial);
        }

        if (category) {
            filteredBooks = filterByCategory(filteredBooks, category);
        }

        if (author) {
            filteredBooks = filterByAuthor(filteredBooks, author);
        }

        if (filteredBooks.length === 0) {
            return res.status(404).json({ message: "No se encontraron libros que coincidan con los filtros." });
        }

        let paginatedResult;
        try {
            paginatedResult = pagination(filteredBooks, page, productsByPage);
        } catch (paginationError) {
            return res.status(400).json({ error: paginationError.message });
        }

        return res.status(200).json(paginatedResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = allBooks;