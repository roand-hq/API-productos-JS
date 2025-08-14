import employees from "../models/employees.js";
import clients from "../models/clients.js";
import bcrypt from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; //generar tokens
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userFound; //usuario encontrado
    let userType; //de que tipo es este usuario
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {

      //Empleado
      userFound = await employees.findOne({ email });
      userType = "employee";

      //Cliente
      if (!userFound) {
        userFound = await clients.findOne({ email });
        userType = "client";
      }
    }
    if (!userFound) {
      return res.json({ message: "user not found :((" });
    }
    if(userType !== "admin") {
      if(userFound,timeoutUntil > Date.now()) {
      const minutosRestantes = Math.ceil((userFound.timeoutUntil - Date.now()) / 60000);
        return res.json({ message: `Too many attempts, try again in ${minutosRestantes} minutes` }); 
      }
    }
    //Desencriptar contraseña si NO soy admin
    if (userType !== "admin") {
      const isMatch = bcrypt.compare(password, userFound.password);

      if (!isMatch) {
        userFound.loginAttempts += 1;
        if (userFound.loginAttempts >= 3) {
         userFound.timeoutUntil = Date.now() + 15 * 60 * 1000; // 15 minutos
          await userFound.save();
          return res.json({ message: "La carlitos, esperate 15 minutotes" });
        }
        res.json({ message: "Invalid password :((" });

        userFound.loginAttempts = 0; // Resetear intentos de inicio de sesión
        userFound.timeoutUntil = null; // Resetear tiempo de bloqueo
        await userFound.save();
      }
    }
    //TOKEN
    jsonwebtoken.sign(
      { _id: userFound._id, userType },
      config.JWT.secret,
      {
        expiresIn: config.JWT.expires,
      },
      //guardar el token en cookies
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        
      }
    );
  } catch (error) {
    console.log("error: " + error);
    res.json({ message: "errorsito" });
  }
};
export default loginController;