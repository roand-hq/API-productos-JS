import express from "express";
import faqController from "../controllers/faqsController.js";

const router = express.Router();

router.route("/").get(faqController.getAllFaqs).post(faqController.insertFaqs);

router
  .route("/:id")
  .get(faqController.get1Faqs)
  .put(faqController.updateFaqs)
  .delete(faqController.deleteFaqs);

export default router;
