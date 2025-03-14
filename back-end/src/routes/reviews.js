import express from "express";
const router = express.Router();

import reviewController from "../controllers/reviewsController.js";

router
.route("/")
.get(reviewController.getReviews)
.post(reviewController.createReviews)

router
.route("/:id")
.delete(reviewController.deleteReviews)
.put(reviewController.updateReviews)

export default router;