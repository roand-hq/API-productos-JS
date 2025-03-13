import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
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
    require: true
  },
  email : {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  hireDate: {
    type: Date,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  dui: {
    type: String,
    require: true
  },
  isssNumber: {
    type: String,
    require: true
  },
  verified: {
    type: Boolean,
    require: true
  }
},{
  timestamps: true,
  strict: false,
});
export default model("Employees", employeeSchema);