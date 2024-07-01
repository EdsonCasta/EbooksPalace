const { Book, Cart } = require('../db');
const path = require('path');
const axios = require('axios');
const { createReadStream } = require('fs');
const { pipeline } = require('stream');

const getDownloadBook = async (req, res) => {
    const userId = req.query.userId;
    const { bookId } = req.params;

    console.log(`Request to download book. User ID: ${userId}, Book ID: ${bookId}`);

    try {
        const paidCarts = await Cart.findAll({
            where: {
                userId: userId,
                status: "Pagado"
            },
            include: {
                model: Book,
                through: { attributes: [] }
            }
        });

        const purchased = paidCarts.some(cart =>
            cart.books.some(book => book.id === parseInt(bookId))
        );

        if (!purchased) {
            console.log(`User ID: ${userId} has not purchased Book ID: ${bookId}`);
            return res.status(403).json({ message: "No has comprado este libro aún." });
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            console.log(`Book ID: ${bookId} not found`);
            return res.status(404).json({ error: "No se encontró el libro." });
        }

        const cloudinaryUrl = book.file;

        const response = await axios({
            url: cloudinaryUrl,
            method: 'GET',
            responseType: 'stream'
        });

        res.setHeader('Content-Disposition', `attachment; filename="${book.title}.pdf"`);
        res.setHeader('Content-Type', 'application/pdf');

        pipeline(response.data, res, (err) => {
            if (err) {
                console.error(`Pipeline error: ${err}`);
                return res.status(500).json({ message: 'Error al transmitir el archivo.' });
            }
        });

    } catch (error) {
        console.error(`Server error: ${error.message}`);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = {
    getDownloadBook
};

