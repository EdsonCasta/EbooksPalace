const { User } = require('../db');

const putUserCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        let userExists = await User.findByPk(id);

        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        if (userExists.role === "Cliente") {
            return res.status(400).json({ error: "User is already as customer" });
        }

        userExists.role = "Cliente";
        await userExists.save();

        return res.status(200).json({ message: "User updated to customer", userExists });
    } catch (error) {
        console.error("Error updating user status", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    putUserCustomer
}