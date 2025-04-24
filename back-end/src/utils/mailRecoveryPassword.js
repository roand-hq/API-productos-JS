import nodemailer from "nodemailer";
import { config } from "../config.js";

//Paso 1: Configurar el transporter (quien envia el correo)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL.user,
    pass: config.EMAIL.pass,
  },
});

//Paso 2: A quien se le manda el correo
const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Hola amigo" <rodrigo.hq.007@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    console.log(
      "El error al enviar el correo de cambio de contraseña es " + error
    );
  }
};

const HTMLRecoveryMail = (code) => {
  return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Restablecimiento de Contraseña</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333;
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
          }
          .code {
            display: block;
            margin-top: 15px;
            padding: 10px;
            background-color: #f8f9fa;
            border: 1px solid #ccc;
            font-family: monospace;
            font-size: 18px;
            color: #333;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888;
          }
          .footer a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Restablecimiento de Contraseña</h2>
          <p>Hola,</p>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si fuiste tú, utiliza el siguiente código para continuar con el proceso de restablecimiento:</p>
          
          <div class="code">${code}</div>
          
          <p>Ingresa este código en el formulario de restablecimiento de contraseña en nuestra página web para cambiar tu contraseña.</p>
          
          <p>Si no solicitaste este cambio, por favor ignora este mensaje. Tu contraseña no se verá afectada.</p>
          
          <div class="footer">
            <p>Gracias por utilizar nuestros servicios.</p>
            <p><a href="https://www.tusitio.com">Visítanos</a> | <a href="mailto:support@tusitio.com">Soporte</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export {sendMail, HTMLRecoveryMail};