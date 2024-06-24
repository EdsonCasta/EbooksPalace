const { Cart } = require("../db");

const putCartState = async (req, res) => {
    try {
        const { id } = req.params;

        let cartExists = await Cart.findByPk(id);

        if (!cartExists) {
            return res.status(404).json({ error: "Cart not found" });
        }

        if (cartExists.status === "Pagado") {
            return res.status(400).json({ error: "Cart is already paid" });
        }

        cartExists.status = "Pagado";
        await cartExists.save();

        return res.status(200).json({ message: "Cart status updated to Paid", cartExists })
    } catch (error) {
        console.error("Error updating cart status", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    putCartState
}