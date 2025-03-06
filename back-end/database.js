import mongoose from "mongoose";

//configurar uri de la base de datos
const URI = "mongodb://localhost:27017/ferreteriaEPA;"

//conectar a la base de datos
mongoose.connect(URI);  

//crear una variable 
const connection = mongoose.connection;

connection.once("open", () => {console.log("db is connected")}) //si se conecta pasa esto
connection.on("disconnected", () => {console.log("db is disconnected")}) //si no pasa esto
connection.on("error",() => { console.log("ERROR")}) //si ripea pasa esto