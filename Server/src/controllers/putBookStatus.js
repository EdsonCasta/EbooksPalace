const { Book } = require("../db");

const BookStatus = async (req, res) => {

  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    book.state = book.state === "Activo" ? "Inactivo" : "Activo";

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el libro' });
  }
};

module.exports = BookStatus;
