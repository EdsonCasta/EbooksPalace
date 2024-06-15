const { Book } = require('../db');
const { Op } = require('sequelize');

async function booksByName(req, res) {
  try {
    const { name } = req.query;
    console.log("inicio", name)

    if (!name) {
      return res.status(400).json({ error: 'El parámetro "name" es requerido' });
    }

    const books = await Book.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });
    console.log("medio", books)

    if (books.length === 0) {
      return res.status(404).json({ error: 'No se encontró ningún resultado' });
    }

    return res.status(200).json(books);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = booksByName;

