import mongoose from "mongoose";

const appMetricsSchema = new mongoose.Schema(
    {
        key: { type: String, required:true, unique:true, default: "global"},
        cvDownloads : { type: Number, default: 0},
    },
    { timestamps: true }
);

const AppMetrics = mongoose.model("AppMetrics", appMetricsSchema);
export default AppMetrics;