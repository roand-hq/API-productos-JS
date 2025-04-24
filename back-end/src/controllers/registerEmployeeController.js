import employees from "../models/employees.js";
import bcrypt from "bcryptjs"; // Encriptar
import jsonwebtoken from "jsonwebtoken"; //generar tokens
import { config } from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
  const {
    name,
    lastName,
    birthday,
    email,
    address,
    hireDate,
    password,
    phoneNumber,
    dui,
    isssNumber,
    verified,
  } = req.body;

  try {
    const employeeExists = await employees.findOne({email});
    if (employeeExists) {
      return res.json("There´s already an employee with this email");
    }
    //Encriptar contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);
    //crear usuario
    const newEmployee = new employees({
      name,
      lastName,
      birthday,
      email,
      address,
      hireDate,
      password: encryptedPassword,
      phoneNumber,
      dui,
      isssNumber,
      verified,
    });
    await newEmployee.save();
    //generar token
    jsonwebtoken.sign(
      //1- que voy a guardar
      { id: newEmployee._id },
      //2- secreto
      config.JWT.secret,
      //3- cuando expira
      { expiresIn: config.JWT.expires },
      //4- ff (que hacer si hay un error)
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json("usuario registrado");
      }
    );
  } catch (error) {
    console.log("error: " + error);
    res.json({ message: "errorsito" });
  }
};

export default registerEmployeeController;