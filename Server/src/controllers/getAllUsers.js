const { User } = require("../db");

const getAllUsers = async (req, res) => {
    try {
        const getUsers = await User.findAll();
        if (!getUsers) {
            res.status(400).json("No se encontraron usuarios");
        }
        return res.status(200).json(getUsers);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
module.exports = {
    getAllUsers
}