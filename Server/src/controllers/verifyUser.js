const { User } = require("../db")

const verifyUser = async (req, res) => {
    try {
        const { email, name, picture } = req.body;

        if (!email || !name || !picture) {
            return res.status(400).json({ message: "Faltan datos" })
        }

        const [newUser, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                name: name,
                email: email,
                profilePicture: picture
            }
        });

        if (!created) {
            return res.status(200).json({ message: "Usuario existente", newUser })
        }

        if (created) {
            return res.status(201).json({ message: "Usuario registrado exitosamente", newUser })
        }
    } catch (error) {
        console.log({ error: error.message })
    }


};

module.exports = {
    verifyUser
}
