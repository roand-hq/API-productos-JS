import express from "express"
import salesController from "../controllers/salesController.js"

const router =  express.Router()

router.route("/").post(salesController.addSales)

router.route("/by-category").get(salesController.salesByCategory)
router.route("/most-sold").get(salesController.mostSoldProducts)
router.route("/top-costumers").get(salesController.topCostumer)
router.route("/profit").get(salesController.totalProfit)
router.route("/by-date").get(salesController.salesByDate)

export default router;