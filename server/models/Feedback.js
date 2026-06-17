import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["bug","improvement","general"],
            default: "general",
        },
        message: { type: String, required:true, trim:true, maxLength: 2000},
        email: {type: String, default:"", trim:true, lowercase: true},
        context: { type:String, default: "", trim: true},
        status: {
            type: String,
            enum: ["new","reviewed","closed"],
            default: "new",
        },
    },
    { timestamps: true }
);

const Feedback = mongoose.model("Feedback",feedbackSchema)
export default Feedback;