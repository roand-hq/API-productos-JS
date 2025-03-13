import express from "express";

const router = express.Router();
import clientsController from "../controllers/clientsController.js";

router
  .route("/")
  .get(clientsController.getClients)
  .post(clientsController.createClients);

router
  .route("/:id")
  .get(clientsController.get1Client)
  .delete(clientsController.deleteClients)
  .put(clientsController.updateClients);

export default router;
