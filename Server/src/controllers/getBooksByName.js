const { Book } = require('../db');
const { Op } = require('sequelize');

const booksByName = async (name) => {
  try {

    const books = await Book.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    });

    return books;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = booksByName;

