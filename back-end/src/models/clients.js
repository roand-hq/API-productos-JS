import { Schema, model } from "mongoose";
/*
Campos: 
    nombre
    apellido
    fecha de nacimiento
    email
    contraseña
    telefono
    dui
    Verificado (bool)
*/
const clientSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    birthday: {
      type: Date,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    dui: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
export default model("Clients", clientSchema);
