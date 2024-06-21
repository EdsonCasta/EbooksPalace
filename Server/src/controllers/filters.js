const filterByGeneralSearch = (books, searchValue) => {
    try {
        return books.filter(book => {
            const searchLower = searchValue.toLowerCase();
            return (
                book.name.toLowerCase().includes(searchLower) ||
                book.author.toLowerCase().includes(searchLower) ||
                book.editorial.toLowerCase().includes(searchLower)
            );
        });
    } catch (error) {
        throw new Error('Error al filtrar por búsqueda general');
    }
};

const filterByEditorial = (books, partialEditorial) => {
    try {
        return books.filter(book => {
            const bookArray = book.editorial.split(',');
            return bookArray.some(edit => edit.trim().toLowerCase().includes(partialEditorial.toLowerCase()));
        });
    } catch (error) {
        throw new Error('Error al filtrar por editorial');
    }
};

const filterByCategory = (books, category) => {
    try {
        return books.filter(book => {
            const categoryArray = book.category.split(',');
            return categoryArray.some(c => c.trim().toLowerCase() === category.toLowerCase());
        });
    } catch (error) {
        throw new Error('Error al filtrar por categoría');
    }
};

const filterByAuthor = (books, partialAuthor) => {
    try {
        return books.filter(book => {
            const authorArray = book.author.split(',');
            return authorArray.some(a => a.trim().toLowerCase().includes(partialAuthor.toLowerCase()));
        });
    } catch (error) {
        throw new Error('Error al filtrar por autor');
    }
};

const filterPriceRange = (books, minimo, maximo) => {
    let filteredBooks = [];

    if (minimo !== undefined && maximo !== undefined) {
        filteredBooks = books.filter(book => {
            return book.price >= parseFloat(minimo) && book.price <= parseFloat(maximo);
        });
    } else if (minimo !== undefined) {
        filteredBooks = books.filter(book => {
            return book.price >= parseFloat(minimo);
        });
    } else if (maximo !== undefined) {
        filteredBooks = books.filter(book => {
            return book.price <= parseFloat(maximo);
        });
    } else {
        filteredBooks = books;
    }

    return filteredBooks;
};

module.exports = { filterByGeneralSearch, filterByEditorial, filterByCategory, filterByAuthor, filterPriceRange };
