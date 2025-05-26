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
    //Desencriptar contraseña si NO soy admin
    if (userType !== "admin") {
      const isMatch = bcrypt.compare(password, userFound.password);

      if (!isMatch) {
        res.json({ message: "Invalid password :((" });
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