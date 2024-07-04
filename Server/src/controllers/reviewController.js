const { User, Cart, Review } = require("../db");

const createReview = async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  try {
    // Verificar si el usuario tiene una compra pagada
    const paidCart = await Cart.findOne({ where: { userId, status: 'Pagado' } });

    if (!paidCart) {
      return res.status(400).json({ message: 'No se puede dejar una reseña sin tener una compra pagada.' });
    }

    // Crear la reseña
    const review = await Review.create({ userId, content });

    res.status(201).json(review);
  } catch (error) {
    console.error('Error al crear la reseña:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getReview = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: {
        model: User,
        attributes: ['id', 'name'] // Ajusta según los atributos que necesites
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener las reseñas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateReview = async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  try {
    // Busca la reseña existente
    const review = await Review.findOne({ where: { userId } });

    if (!review) {
      return res.status(404).json({ message: 'No se encontró ninguna reseña para este usuario' });
    }

    // Actualiza la reseña
    await review.update({ content });

    res.status(200).json({ message: 'Reseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la reseña:', error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: {
        model: User,
        attributes: ['id', 'name'] // Ajusta según los atributos que necesites
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener las reseñas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  createReview,
  getReview,
  updateReview,
  getReviews
};
