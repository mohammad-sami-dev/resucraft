import express from "express";
import rateLimit from "express-rate-limit";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

const feedbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many feedback submissions. Please try again later." },
});

router.post("/", feedbackLimiter, submitFeedback);

export default router;