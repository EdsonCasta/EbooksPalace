const { shoppingCart } = require("../db");

const getAllCarts = async (req, res) => {
    try {
        const getCarts = await shoppingCart.findAll();
        if (!getCarts) {
            res.status(400).json("No se encontraron carritos")
        }
        return res.status(200).json(getCarts);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
module.exports = {
    getAllCarts
}