import RecoveryPassword from "../routes/RecoveryPassword.js";
import { sendMail, HTMLRecoveryMail } from "../utils/mailRecoveryPassword.js";
import clientModel from "../models/clients.js";
import employeeModel from "../models/employees.js";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import bycriptjs from "bcryptjs";
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

    res.json("Correo enviado ");
  } catch (error) {
    console.log("Algo salio mal: " + error);
  }
};

RecoveryPasswordController.verifyCode = async (req, res) => {
  const { code } = req.body;
  try {
    //obtenemos el token
    const token = req.cookies.tokenRecoveryCode;
    //extraemos el codigo del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    //comparamos el codigo que el usuario escribe con el que tengo guardado en el token
    if (decoded.code !== code) return res.json({ message: "invalid code" });

    //token con la informacion ya validada
    const newToken = jsonwebtoken.sign(
      //que guardaremos
      {
        email: decoded.email,
        code: decoded.code,
        userType: decoded.userType,
        verified: true,
      },
      //palabra secreta
      config.JWT.secret,
      //cuando expira
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
    res.json({ message: "Code verified successfully" });
  } catch (error) {
    console.log("Error al verificar token: " + error);
  }
};

RecoveryPasswordController.newPassword = async (req, res) => {
  const { newPassword } = req.body;
  try {
    //1 - extraer el token de las cookies
    const token = req.cookies.tokenRecoveryCode;
    //2 - extraer la informacion del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    //3- comprobar si el codigo no fue verificado
    if (!decoded.verified) return res.json({ message: "Code not verified" });
    //Extraer el email y el userType
    const { email, userType } = decoded;
    //encriptar la contra
    const hashedPassword = await bycriptjs.hash(newPassword, 10);

    let updateUser;
    if (userType === "client") {
      updateUser = await clientModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }
    if(userType === "employee") {
      updateUser = await employeeModel.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
    }
    //eliminar el token
    res.clearCookie("tokenRecoveryCode")
    res.json({message: "Password updated successfully"})
  } catch (error) { console.log("El error cambiando la contraseña es: "+ error)}
};
export { RecoveryPasswordController };
