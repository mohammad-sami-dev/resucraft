import rateLimit from "express-rate-limit";

export const aiGuestLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max:2,
    skip: (req) => (!!req.user),
    message: {
        error: "Daily import limit reached. Please create an account."
    }
});