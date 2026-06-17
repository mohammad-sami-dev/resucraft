import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const optionalAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) {
        return next();
    }

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
    }
    catch {
        // Invalid/expired token should not block public access.
    }
    next();
};
