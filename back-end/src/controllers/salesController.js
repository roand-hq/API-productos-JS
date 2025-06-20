import salesModel from "../models/sales.js";

const salesController = {};

salesController.addSales = async (req, res) => {
  try {
    const { product, category, customer, total, date } = req.body;
    const newSale = new salesModel({
      product,
      category,
      customer,
      total,
      date,
    });
    await newSale.save();
    res.status(200).json({message: "Sale saved"})
  } catch (error) {
    console.log("Error al insertar: "+error)
    res.status(500).json({message: "Internal server error"})
  }
};

salesController.salesByCategory = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          _id: "$category",
          totalSales: { $sum: "$total" },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error al calcular: " + error);
    res.status(500).json({ message: "Error al calculcar total :((" });
  }
};

salesController.mostSoldProducts = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          _id: "$product",
          salesAmount: { $sum: 1 },
        },
      },
      {
        $sort: { salesAmount: -1 },
      }, //limitar cantidad de datos a mostrar
      { $limit: 5 },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error al contar: " + error);
    res.status(500).json({ message: "Error al contar :((" });
  }
};

salesController.topCostumer = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          _id: "$customer",
          comprasRealizadas: { $sum: 1 },
        },
      },
      {
        $sort: { salesAmount: -1 },
      }, //limitar cantidad de datos a mostrar
      { $limit: 3 },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error al contar: " + error);
    res.status(500).json({ message: "Error al contar :((" });
  }
};

salesController.totalProfit = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: { $sum: "$total" },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error al calcular: " + error);
    res.status(500).json({ message: "Error al calculcar total :((" });
  }
};

salesController.salesByDate = async (req, res) => {
  try {
    const result = await salesModel.aggregate([
      {
        $group: {
          //asi se saca año       //asi se saca el mes
          _id: { anio: { $year: "$date" }, month: { $month: "$date" } },
          totalSales: { $sum: "$total" },
        },
      },
      {
        $sort: { totalSales: -1 },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error al calcular: " + error);
    res.status(500).json({ message: "Error al calculcar total :((" });
  }
};

export default salesController;
