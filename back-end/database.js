import mongoose from "mongoose";
import {config} from "./src/config.js"

//conectar a la base de datos
mongoose.connect(config.db.URI);

//crear una variable 
const connection = mongoose.connection;

connection.once("open", () => {console.log("db is connected")}) //si se conecta pasa esto
connection.on("disconnected", () => {console.log("db is disconnected")}) //si no pasa esto
connection.on("error",() => { console.log("ERROR")}) //si ripea pasa esto