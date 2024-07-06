const { Book } = require("../db");

const EditBook = async (req, res) => {

    const { id } = req.params;
    const { name, editorial, category, author, price, description } = req.body;
  
    try {
      const book = await Book.findByPk(id);
    
      if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
  
      book.name = name || book.name;
      book.editorial = editorial || book.editorial;
      book.category = category || book.category;
      book.author = author || book.author;
      book.price = price || book.price;
      book.description = description || book.description;
  
      await book.save();
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar el libro' });
    }
  };
  
  module.exports = EditBook;