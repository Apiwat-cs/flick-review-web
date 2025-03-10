import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;