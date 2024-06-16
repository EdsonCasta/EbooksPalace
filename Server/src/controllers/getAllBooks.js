const { Book } = require('../db');
const pagination = require('./pagination');
const booksByName = require("./getBooksByName")
const { sortBooksAlphabetically, filterByPrice } = require("./filtersOrder")
const { filterByEditorial, filterByCategory, filterByAuthor } = require('./filters');

const allBooks = async (req, res) => {

    const { name, page = 1, productsByPage = 30, editorial, category, author, order, sort } = req.query;

    try {

        let books = await Book.findAll();

        let filteredBooks = books;

        if (name) {
            filteredBooks = await booksByName(name)
        }

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

        if (order) {
            filteredBooks = await sortBooksAlphabetically(filteredBooks, order);
        }

        if (sort) {
            filteredBooks = await filterByPrice(filteredBooks, sort);
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