import express from "express";
import loginController from "../controllers/loginController.js";
const router = express.Router();

// se hace post para poder enviar el correo y contraseña
router.route("/").post(loginController.login);  
export default router;
