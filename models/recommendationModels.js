import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
   user_input: {
      type: String,
      required: true
   },
   recommended_movies: {
      type: Array,
      required: true
   }
}, { timestamps: true });

export const Recommendation = mongoose.model("Recommendation", recommendationSchema);
export default Recommendation;