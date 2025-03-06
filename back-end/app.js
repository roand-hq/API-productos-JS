//importar todo lo de express que instale con npm install
import express from "express";
import productsRoutes from "./src/routes/products.js";
// Crea una constante que es igual a la librería que importe
const app = express();

//middleware para aceptar datos desde postman
app.use(express.json());

//Vinculando la url a la ruta
app.use("/api/products", productsRoutes);

// Exporta la constante app en otros archivos
export default app;
