import AppMetrics from "../models/AppMetrics.js"

export const incrementDownload = async (req, res) => {
    try{
        // No counting in non-production environment
        if (process.env.NODE_ENV !== "production") {
            return res.status(200).json({ ok:true, conted:false});
        }

        const doc = await AppMetrics.findOneAndUpdate(
            { key: "global"},
            { $inc: {cvDownloads: 1}},
            { upsert: true, new:true, setDefaultsOnInsert:true}
        );

        return res.status(200).json({ ok:true, counted: true, cvDownloads: doc.cvDownloads});
    }
    catch(err){
        return res.status(500).json({ ok: false,error: err.message});
    }
};


export const getPublicMetrics = async (req, res) => {
    try {
        const doc = await AppMetrics.findOne({ key: "global" })
        return res.status(200).json({
            cvDownloads: doc?.cvDownloads || 0,
        });
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    }
};