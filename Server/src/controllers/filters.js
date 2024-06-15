const filterByEditorial = (books, editorial) => {
    try {
        return books.filter(book => {
            const bookArray = book.editorial.split(',');
            return bookArray.some(edit => edit.trim().toLowerCase() === editorial.toLowerCase());
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

const filterByAuthor = (books, author) => {
    try {
        return books.filter(book => {
            const authorArray = book.author.split(',');
            return authorArray.some(a => a.trim().toLowerCase() === author.toLowerCase());
        });
    } catch (error) {
        throw new Error('Error al filtrar por autor');
    }
};

module.exports = { filterByEditorial, filterByCategory, filterByAuthor };
