const { google } = require("googleapis");
const { User } = require("../db");
const nodemailer = require("nodemailer");
require('dotenv').config(); 

const oauth2Client = new google.auth.OAuth2(
  process.env.EMAIL_CLIENT_ID,
  process.env.EMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" 
);

oauth2Client.setCredentials({
  refresh_token: process.env.EMAIL_REFRESH_TOKEN,
});


async function getAccessToken() {
  try {
    const { token } = await oauth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error("Error al obtener el accessToken:", error.message);
    throw new Error("Error al obtener el accessToken");
  }
}


async function enviarCorreoBienvenida(destinatario) {
  const accessToken = await getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: destinatario,
    subject: "¡Bienvenido a Ebooks Palace!",
    text: `Hola,

¡Nos complace darte la bienvenida a Ebooks Palace!

Estamos encantados de que te unas a nuestra comunidad de amantes de la lectura. En Ebooks Palace, encontrarás una extensa colección de libros electrónicos que abarcan una amplia gama de géneros y autores. Nuestro objetivo es ofrecerte la mejor experiencia de lectura en línea, con acceso a títulos nuevos y clásicos que podrás disfrutar en cualquier momento y lugar.

### ¿Qué puedes esperar de Ebooks Palace?

- **Colección Diversa:** Explora miles de libros electrónicos de diferentes géneros.
- **Acceso Instantáneo:** Lee tus libros favoritos en cualquier dispositivo, sin esperas.
- **Recomendaciones Personalizadas:** Descubre nuevas lecturas basadas en tus intereses.
- **Ofertas Especiales:** Disfruta de descuentos y promociones exclusivas para nuestros miembros.

Estamos aquí para ayudarte en tu viaje de lectura.

Gracias por unirte a Ebooks Palace. ¡Esperamos que disfrutes de la mejor experiencia de lectura!

Saludos cordiales,

El equipo de Ebooks Palace`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error al enviar el correo:", error.message);
    } else {
      console.log("Correo de bienvenida enviado: " + info.response);
    }
  });
}

const verifyUser = async (req, res) => {
  try {
    const { email, name, profilePicture } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Usuario existente", existingUser });
    }

    const newUser = await User.create({
      name,
      email,
      profilePicture,
    });

    
    await enviarCorreoBienvenida(email);

    return res
      .status(201)
      .json({ message: "Usuario registrado exitosamente", newUser });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

module.exports = {
  verifyUser,
};
