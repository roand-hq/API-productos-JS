import RecoveryPassword from "../routes/RecoveryPassword.js";
import { sendMail, HTMLRecoveryMail } from "../utils/mailRecoveryPassword.js";
import clientModel from "../models/clients.js";
import employeeModel from "../models/employees.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
// Array de funciones vacias

const RecoveryPasswordController = {};

RecoveryPasswordController.requestCode = async (req, res) => {
  //pedimos el email
  const { email } = req.body;
  try {
    //Verificamos que el usuario exista
    let userFound;
    let userType;
    userFound = await clientModel.findOne({ email });
    if (userFound) userType = "Client";
    else userFound = employeeModel.findOne({ email });
    if (userFound) userType = "Employee";

    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();

    //Guardar todo como token
    const token = jsonwebtoken.sign(
      { email, code, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });
    sendMail(
      email,
      "PASSWORD RECOVERY CODE",
      `Your verification code is ${code}`,
      HTMLRecoveryMail(code)
    );

    res.json("Correo enviado ")
  } catch (error) {
    console.log("Algo salio mal: " + error);
  }
};

export {RecoveryPasswordController}

