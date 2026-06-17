import Cv from "../models/Cv.js";


// POST /api/cv/create -- Creates and stores a new CV linked to the logged-in user.
// This endpoint always creates a new CV document.

export const createCv = async (req, res) => {
    const { title, data, layout, customStyles, visibleSections,thumbnail } = req.body;
    if (!data || !layout) {
            return res.status(400).json({ message: 'Invalid CV data' });
    }
    try {
        const newCv = await Cv.create({
            user: req.user._id,
            title,
            data,
            layout,
            customStyles,
            visibleSections,
            thumbnail
        });
        res.status(201).json(newCv);
    }
    catch (err) {
        res.status(500).json( err.message );
    }
};

//GET /api/cv/all  --  get all the CVs of a authenticated user.

export const getAllCvs = async (req, res) => {
    try {
        const cvs = await Cv.find({ user: req.user._id }).select("title thumbnail");
        res.status(200).json(cvs);
        console.log("req.user:", req.user);
    }
    catch (err) {
        res.status(500).json({
            message : 'Failed to create cv', 
            error: err.message
         });
    }
}
    


// GET /api/cv/:id  --  get a specific CV for a authenticated user

export const getSingleCv = async (req, res) => {

    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        if (cv.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ message: 'Unauthorized' });
        }
        res.status(200).json({
            formData:cv.data,
            customStyles:cv.customStyles || {},
            visibleSections: cv.visibleSections || {},
            layout: cv.layout || "Layout 1",
            title: cv.title || ''
        });
    }
    catch (err) {
        res.status(500).json({
            message:  'failed to fetch the CV',
            error: err.message
        })
    }

}


// PUT /api/cv/:id  --  update a specific CV of an authorized user

export const updateCv = async (req, res) => {

    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv || cv.user.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'Unauthorized' });

        const { data, layout, customStyles, visibleSections,title,thumbnail } = req.body;

        cv.title = title || cv.title;
        cv.data = data;
        cv.layout = layout;
        cv.customStyles = customStyles;
        cv.visibleSections = visibleSections;
        cv.thumbnail = thumbnail;
 
        await cv.save();
        res.status(200).json(cv);
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }


};


// DELETE /api/cv/:id  --  delete a specific CV belonging to the authorized user

export const deleteCv = async (req, res) => {

    try {
        const cv = await Cv.findById(req.params.id);
        if (!cv){
            return res.status(404).json({ message: 'CV not found' });
        }
        else if(cv.user.toString() !== req.user._id.toString()){
            return res.status(403).json({ message:'Unauthorized user' })
        }
           

        await Cv.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'CV deleted' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}