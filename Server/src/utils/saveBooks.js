const axios = require('axios');
const { Book } = require('../db');

const saveBooks = async () => {
    try {
        const { data } = await axios("https://raw.githubusercontent.com/MairaZamer/EbooksPalacejson/main/datosEBookspalace.json");


        for (let book of data) {
            Book.create({
                id: book.id,
                name: book.name,
                editorial: book.editorial,
                category: book.category,
                author: book.author,
                price: book.price,
                image: book.image,
                description: book.description,
                file: book.file
            });
        }

        console.log('Datos guardados exitosamente');
    } catch (error) {
        console.log('Error al guardar los datos', error)
    }
};

module.exports = saveBooks;

