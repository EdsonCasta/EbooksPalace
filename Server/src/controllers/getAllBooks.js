const { Book } = require('../db');
const { sortBooksAlphabetically, filterByPrice } = require("./filtersOrder")
const { filterByEditorial, filterByCategory, filterByAuthor, filterPriceRange, filterByGeneralSearch } = require('./filters');
const pagination = require('./pagination');

const allBooks = async (req, res) => {

    const { page = 1, productsByPage = 30, editorial, category, author, order, sort, minimo, maximo, search } = req.query;

    try {

        let books = await Book.findAll();

        let filteredBooks = books;

        if (search) {
            filteredBooks = filterByGeneralSearch(filteredBooks, search);
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

        if (minimo !== undefined || maximo !== undefined) {
            filteredBooks = filterPriceRange(filteredBooks, minimo, maximo);
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

        const totalPages = Math.ceil(filteredBooks.length / productsByPage);

        let paginatedResult;
        try {
            paginatedResult = pagination(filteredBooks, page, productsByPage);
        } catch (paginationError) {
            return res.status(400).json({ error: paginationError.message });
        }

        return res.status(200).json({ totalPages, books: paginatedResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = allBooks;