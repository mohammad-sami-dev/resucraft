import multer from "multer";

// store in memor do now save to disk

const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true)
    }
    else {
        cb(new Error('Only PDF files allowed'), false);
    }
};

export const uploadResume = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})
