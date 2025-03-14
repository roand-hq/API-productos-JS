import reviewsModel from "../models/reviews.js";

const reviewController = {};

reviewController.getReviews = async (req, res) => {
  const reviews = await reviewsModel.find().populate("idClient");
  res.json(reviews);
};

reviewController.createReviews = async (req, res) => {
  const { comment, rating, idClient } = req.body;
  const newReview = new reviewsModel({ comment, rating, idClient });
  await newReview.save();
  res.json("Nadie pidio tu opinion");
};

reviewController.deleteReviews = async (req, res) => {
  const deletedReview = await reviewsModel.findByIdAndDelete(req.params.id);
  res.json("Opinion invalidada");
};

reviewController.updateReviews = async (req, res) => {
  const { comment, rating, idClient } = req.body;
  const updatedReview = await reviewsModel.findByIdAndUpdate(
    req.params.id,
    { comment, rating, idClient },
    { new: true }
  );
  res.json("Opinion cambiada")
};

export default reviewController;