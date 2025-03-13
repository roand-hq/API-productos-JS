import express from "express";

const router = express.Router();
import branchesController from "../controllers/branchesController.js";

router
  .route("/")
  .get(branchesController.getBranches)
  .post(branchesController.createBranches);

router
  .route("/:id")
  .get(branchesController.get1Branch)
  .delete(branchesController.deleteBranches)
  .put(branchesController.updateBranches);

export default router;