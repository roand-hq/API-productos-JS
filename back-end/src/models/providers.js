import { Schema, model } from "mongoose";

const providerSchema = new Schema({
  name: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  image: { type: String, require: true }
},{
    timestamps:true,
    strict: false
});
export default model("Providers",providerSchema)