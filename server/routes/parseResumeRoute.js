import express from "express"
import { uploadResume } from "../middleware/uploadMiddleware.js"
import { parseResume } from "../controllers/parseResumeController.js"
import { aiGuestLimiter } from "../middleware/aiLimiter.js";
import { optionalAuth } from "../middleware/optionalAuth.js";
import { checkAiQuota } from "../middleware/checkAiQuota.js";

const router = express.Router();

router.post("/parse-resume",optionalAuth,aiGuestLimiter,checkAiQuota,uploadResume.single("resume"), parseResume);


export default router;
