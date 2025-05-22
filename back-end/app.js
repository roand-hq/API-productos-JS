//importar todo lo de express que instale con npm install
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js";
import employeesRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewsRoutes from "./src/routes/reviews.js";
import registerEmployee from "./src/routes/registerEmployee.js";
import cookieParser from "cookie-parser";
import login from "./src/routes/login.js";
import logout from "./src/routes/logout.js";
import registerClient from "./src/routes/registerClient.js";
import RecoveryPassword from "./src/routes/RecoveryPassword.js";
import providersRoutes from "./src/routes/providers.js";
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
// Crea una constante que es igual a la librería que importe
const app = express();

//middleware para aceptar datos desde postman
app.use(express.json());
app.use(cookieParser());
//Vinculando la url a la ruta
app.use(
  "/api/products",
  validateAuthToken(["employee", "admin"]),
  productsRoutes
);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use(
  "/api/branches",
  validateAuthToken(["employee", "admin"]),
  branchesRoutes
);
app.use("/api/reviews", reviewsRoutes);
app.use(
  "/api/registerEmployee",
  validateAuthToken(["employee", "admin"]),
  registerEmployee
);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("/api/registerClient", registerClient);
app.use("/api/RecoveryPassword", RecoveryPassword);
app.use(
  "/api/providers",
  validateAuthToken(["employee", "admin"]),
  providersRoutes
);
// Exporta la constante app en otros archivos
export default app;
