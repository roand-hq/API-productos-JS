import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import clientModel from "../models/clients.js";
import { config } from "../config.js";
import { text } from "express";

const registerClientController = {};

registerClientController.register = async (req, res) => {
  const {
    name,
    lastName,
    birthday,
    email,
    password,
    phoneNumber,
    dui,
    verified,
  } = req.body;

  try {
    //Paso 1: Verificar si el cliente ya existe
    const alreadyExists = await clientModel.findOne({ email });
    if (alreadyExists) {
      return res.json({ message: "Client already exists" });
    }
    //Paso 2: Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);
    //Paso 3: Guardar el usuario
    const newClient = new clientModel({
      name,
      lastName,
      birthday,
      email,
      password: passwordHash,
      phoneNumber,
      dui: dui || null,
      verified: verified || false,
    });
    await newClient.save();
    //Paso 4: Generar un codigo aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex"); //3 letras y 3 numeros

    //Paso 5: Generar un token para guardar el codigo que cree
    const token = jsonwebtoken.sign(
      //que voy a guardar
      { email, verificationCode },
      //palabra secreta
      config.JWT.secret,
      //cuando expira
      { expiresIn: "2h" }
    );
    res.cookie("verificationToken", token, { maxAge: 7200000 });
    //Enviar correo

    //Paso 1: Transporte o quien lo envia
    const transporter = nodemailer.createTransport({
      service: "gmail",
      //aqui van el correo y contraseña del correo desde el que se enviara algo
      auth: { 
        user: config.EMAIL.user, 
        pass: config.EMAIL.pass },
    });

    const mailOptions = {
      from: config.EMAIL.user,
      to: email,
      subject: "verificacion de cuenta",
      text: "Para verificar tu cuenta usa este codigo " + verificationCode,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("El error al enviar correo es: " + error);
      res.json({ message: "Email sent" + info });
    });
    res.json({ message: "Cliente registrado y correo enviado" });
  } catch (error) {
    console.log("El error es: " + error);
    res.json({ message: "El error es " + error });
  }
};
registerClientController.verifyCodeEmail = async (req, res) => {
  const { verificationCodeRequest } = req.body;
  //1- Obtener el token
  const token = req.cookies.verificationToken;
  //2-Verificar y decodificar el token
  const decoded = jsonwebtoken.verify(token, config.JWT.secret);
  const { email, verificationCode: storedCode } = decoded;
  //3-Comparar codigos
  if (verificationCodeRequest !== storedCode) {
    return res.json({ message: "Invalid code" });
  }
  //Si el codigo es igual, ponemos verified en true
  const client = await clientModel.findOne({ email });
  client.isVerified = true;
  await client.save();

  res.clearCookie("verificationToken");
  res.json({ message: "Email verified succesfully" });
};
export default registerClientController;
