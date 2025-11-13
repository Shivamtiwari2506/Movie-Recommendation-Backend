import recommendationControllers from "../controllers/recommendationControllers.js";
import express from "express";

const router = express.Router();

router.post("/recommend", recommendationControllers.createRecommendation);
router.get("/recommendations", recommendationControllers.getRecommendations);

export default router;