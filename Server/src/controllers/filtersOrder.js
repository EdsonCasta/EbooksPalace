const { Book } = require('../db');

const sortBooksAlphabetically = async (books, order) => {
    try {

        const sortedBooks = books.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return order === 'asc' ? 1 : -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return order === 'asc' ? -1 : 1;
            return 0;
        });

        return sortedBooks;

    } catch (error) {
        throw new Error("Error interno del servidor");
    }
};

const filterByPrice = async (books, sort) => {
    try {

        if (sort === 'asc') {
            books.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            books.sort((a, b) => b.price - a.price);
        }

        if (books.length === 0) {
            throw new Error("No se encontraron productos que coincidan con el filtro.");
        }

        return books;

    } catch (error) {
        console.error(error);
        throw new Error("Error interno del servidor");
    }
};

module.exports = { sortBooksAlphabetically, filterByPrice };