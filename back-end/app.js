//importar todo lo de express que instale con npm install
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import branchesRoutes from "./src/routes/branches.js"
import reviewsRoutes from "./src/routes/reviews.js"
// Crea una constante que es igual a la librería que importe
const app = express();

//middleware para aceptar datos desde postman
app.use(express.json());

//Vinculando la url a la ruta
app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/reviews", reviewsRoutes)
// Exporta la constante app en otros archivos
export default app;
