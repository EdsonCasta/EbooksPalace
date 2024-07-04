const { User } = require('../db');

const UserRol = async (req, res) => {
    try {
        const { id } = req.params;

        let userExists = await User.findByPk(id);

        if (!userExists) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        userExists.role = userExists.role === "Administrador" ? "Cliente" : "Administrador";

        await userExists.save();

        return res.status(200).json({ message: "Rol de usuario actualizado", userExists });
    } catch (error) {
        console.error("Error al actualizar el estado del usuario", error.message);
        return res.status(500).json({ error: "Error Interno del Servidor" });
    }
};

module.exports = {
    UserRol
};