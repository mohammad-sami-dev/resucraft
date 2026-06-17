import mongoose from 'mongoose';

const cvSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },

    title: { type: String, default: "" },           // name of the layout
    layout: String,
    customStyles: Object,
    visibleSections: {
        education: { type: Boolean, default: true },
        experience: { type: Boolean, default: true },
        projects: { type: Boolean, default: true },
        skills: { type: Boolean, default: true },
        summary: { type: Boolean, default: true },
        hobbies: { type: Boolean, default: true },
        languages: { type: Boolean, default: true },
        custom: { type: Boolean, default: true },
    }, 
    thumbnail: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    { timestamps: true }
);

const Cv = mongoose.model('Cv', cvSchema);
export default Cv;

