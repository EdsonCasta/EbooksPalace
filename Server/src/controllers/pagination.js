const pagination = (books, page, productsByPage) => {
    
    if (isNaN(page) || page < 1) {
        throw new Error('El número de página debe ser un número entero mayor que 0');
    }

    if (!Array.isArray(books)) {
        throw new Error('Error al obtener las plantillas');
    }

    const pageNumber = Math.ceil(books.length / productsByPage);

    if (page > pageNumber) {
        throw new Error(`El número de página no puede ser mayor que ${pageNumber}`);
    }

    const paginated = books.slice((page - 1) * productsByPage, page * productsByPage);
    return paginated;
};

module.exports = pagination;
