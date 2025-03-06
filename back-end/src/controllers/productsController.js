//aqui van de que todos los metodos (CRUD)

import productsModel from "../models/products.js";
const productsController = {};

//SELECT
productsController.getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.json(products);
};

//CREATE
productsController.createProducts = async (req, res) => {
  const { name, description, price, stock } = req.body;

  const newProducts = new productsModel({ name, description, price, stock });
  await newProducts.save();
  res.json({ message: "Hola bro ya insertaste bro" }); //optional
};

//DELETE
productsController.deleteProducts = async (req, res) => {
  const deleteProducts = await productsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "-1 producto" }); //optional
};

//UPDATE
productsController.updateProducts = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const updatedProduct = await productsModel.findByIdAndUpdate(
    req.params.id,
    { name, description, price, stock },
    { new: true }
  );
  res.json({ message: "Como cuando actualizas" });
};

//SELECT 1
productsController.get1Product = async (req, res) => {
  const product = await productsModel.findById(req.params.id);
  res.json(product);
};

export default productsController;
