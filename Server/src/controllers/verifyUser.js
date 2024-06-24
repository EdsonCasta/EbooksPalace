const { User } = require("../db");

const verifyUser = async (req, res) => {
    try {
        const { email, name, profilePicture } = req.body;

        const existingUser = await User.findOne({
            where: { email },
        });

        if (existingUser) {
            // console.log("Usuario existente:", existingUser);
            return res.status(200).json({ message: "Usuario existente", existingUser });
        }

        const newUser = await User.create({
            name,
            email,
            profilePicture,
        });

        // console.log("Nuevo usuario:", newUser);
        return res.status(201).json({ message: "Usuario registrado exitosamente", newUser });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Error al procesar la solicitud" });
    }
};

module.exports = {
    verifyUser,
};

