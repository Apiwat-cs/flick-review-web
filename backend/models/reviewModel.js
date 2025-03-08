import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        movieId: { type: mongoose.Schema.Types.ObjectId, required: true },
        username: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 10 },
        review: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;