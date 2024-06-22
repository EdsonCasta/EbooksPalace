const { User } = require("../db")

const verifyUser = async (req, res) => {
    try {
        const { email, name, profilePicture } = req.body;

        /* console.log("Datos recibidos en el backend:", { email, name, profilePicture }); */

        const [newUser, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                name: name,
                email: email,
                profilePicture: profilePicture
            }
        });

        if (!created) {
            console.log(newUser)
            return res.status(200).json({ message: "Usuario existente", newUser })
        }

        if (created) {
            console.log(newUser)
            return res.status(201).json({ message: "Usuario registrado exitosamente", newUser })
        }
    } catch (error) {
        console.log("Error:", { error: error.message })
    }


};

module.exports = {
    verifyUser
}
