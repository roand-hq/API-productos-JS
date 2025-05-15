import providersModel from "../models/providers.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

//lo primero es configurar cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_api_key,
  api_secret: config.cloudinary.cloud_api_secret,
});
const providersController = {};

providersController.getProviders = async (req, res) => {
  const Providers = await providersModel.find();
  res.json(Providers);
};

providersController.createProviders = async (req, res) => {
  const { name, phoneNumber } = req.body;
  let imgUrl = "";
  //si se sube un archivo
  if (req.file) {
    //subir la imagen a cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "public",
      allowed_formats: ["jpg", "png", "jpeg"]
    });
    imgUrl = result.secure_url;
}
const newProvier = new providersModel({name,phoneNumber, image: imgUrl})
newProvier.save()
res.json({message:"Provider saved"})
};
export default providersController;