import express from "express";
import { getPublicMetrics,incrementDownload } from "../controllers/metricsController.js";

const router = express.Router();

router.get("/public", getPublicMetrics);
router.post("/download", incrementDownload);

export default router;
