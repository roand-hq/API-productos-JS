import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

//la funcion solicita un array de los usuarios que tienen acceso al endpoint
export const validateAuthToken = async (allowedUserTypes = []) => {
  return (req, res, next) => {
    try {
        //extraer el token de las cookies
      const {authToken} = req.cookies;
      //imprimir mensaje de error si no hay cookies
      if(!authToken) return res.json({message: "You must login first"});
      //extraer informacion del token
      const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)
      //verificar si el rol NO esta en la lista de roles con acceso
      if (allowedUserTypes.includes(decoded.userType)) {
        return res.json({ message: "Access denied" });
      }
      //si SI esta, continuamos
      next();
    } catch (error) {
        console.log(error)
    }
  };
};
