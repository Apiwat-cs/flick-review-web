import express from "express";
import Review from "../models/reviewModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { movieId, username, rating, review } = req.body;

        if (!movieId || !username || !rating || !review) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newReview = new Review({ movieId, username, rating, review });
        await newReview.save();

        res.status(201).json({ message: "Review created successfully!", review: newReview });
    } catch (error) {
        console.error("❌ Error creating review:", error);
        res.status(500).json({ message: "Error creating review" });
    }
});

router.get("/", async (req, res) => {
    const movieId = req.query.movieId;

    if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required' });
    }

    try {
        const reviews = await Review.find({ movieId: movieId });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.put("/:reviewId", async (req, res) => {
    try {
      const { reviewId } = req.params;
      const { rating, review } = req.body;

      if (!rating || !review) {
        return res.status(400).json({ message: "Rating and review are required!" });
      }

      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { rating, review },
        { new: true } 
      );
  
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found!" });
      }
  
      res.status(200).json({ message: "Review updated successfully!", review: updatedReview });
    } catch (error) {
      console.error("❌ Error updating review:", error);
      res.status(500).json({ message: "Error updating review" });
    }
  });

router.delete("/:reviewId", async (req, res) => {
    try {
      const { reviewId } = req.params;
      if (!reviewId) {
        return res.status(400).json({ message: "Review ID is required!" });
      }

      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ message: "Review not found!" });
      }
      res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
      console.error("❌ Error deleting review:", error);
      res.status(500).json({ message: "Error deleting review" });
    }
  });

export default router;