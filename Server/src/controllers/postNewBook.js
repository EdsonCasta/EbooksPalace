const { Book } = require("../db");

const postNewBook = async (req, res) => {
    const { name, editorial, category, author, price, image, description, file } = req.body;



    const validateType = (value, type) => {
        if (type === 'string') return typeof value === 'string';
        if (type === 'number') return !isNaN(parseFloat(value)) && isFinite(value);
        return false;
    };

    try {
        if (!name || !validateType(name, 'string') ||
            !editorial || !validateType(editorial, 'string') ||
            !category || !validateType(category, 'string') ||
            !author || !validateType(author, 'string') ||
            !price || !validateType(price, 'number') ||
            !image || !validateType(image, 'string') ||
            !description || !validateType(description, 'string') ||
            !file || !validateType(file, 'string')) {
            return res.status(400).json({ message: "Todos los campos son requeridos y deben tener el tipo de dato correcto." });
        }

        const existingBook = await Book.findOne({ where: { name } });
        if (existingBook) {
            return res.status(400).json({ message: "Ya existe este libro en la base de datos." });
        }

        const lastBook = await Book.findOne({ order: [["id", "DESC"]] });
        let nextId = 1;
        if (lastBook) {
            nextId = lastBook.id + 1;
        }

        const parsedPrice = parseFloat(price).toFixed(2);//Se implementó a raíz de que llega el price como string desde el form

        const newBook = await Book.create({
            id: nextId,
            name,
            editorial,
            category,
            author,
            price: parsedPrice,
            image,
            description,
            file
        });

        return res.status(200).json(newBook);
    } catch (error) {
        console.error("Error al crear el libro:", error);

        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: "Error de validación:", errors: messages });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "Ya existe un libro con este nombre." });
        }

        return res.status(500).json({ message: "Ocurrió un error al crear el libro." });
    }
};

module.exports = {
    postNewBook
};
