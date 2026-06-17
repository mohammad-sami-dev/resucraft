import User from "../models/User.js";

export const checkAiQuota = async (req, res, next) => {
    if (!req.user) return next();

    const user = await User.findById(req.user.id);

    // initialize aiUsage if missing
    if(!user.aiUsage){
        user.aiUsage = {
            resumeImports:0,
            lastReset: new Date(),
        };
        await user.save();
    }

    const today = new Date();
    const lastReset = new Date(user.aiUsage.lastReset);

    if(today.toDateString() !== lastReset.toDateString()){
        user.aiUsage.resumeImports = 0;
        user.aiUsage.lastReset = today;
        await user.save();

    }
    
    // code that will be used if premium field added to user models
    // const FREE_LIMIT = 3;
    // if(!user.isPremium && user.aiUsage.resumeImports >= FREE_LIMIT){
    //     return res.status(403).json({
    //         error:"Daily AI limit reached. Upgrade to premium."
    //     });
    // }

   req.userDoc = user;

    next();
}