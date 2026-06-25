import multer from "multer";

// store in memor do now save to disk

const storage = multer.memoryStorage();


const PDF_MIME_TYPES = new Set([
    "application/pdf",
    "application/x-pdf",
    "application/acrobat",
    "applications/vnd.pdf",
    "text/pdf",
    "application/octet-stream",
]);

const fileFilter = (req, file, cb) => {
    const isPdfMime = PDF_MIME_TYPES.has(file.mimetype);
    const isPdfName = /\.pdf$/i.test(file.originalname || "");

    if (isPdfMime && (file.mimetype !== "application/octet-stream" || isPdfName)) {
        cb(null, true);
        return;
    }

    if (file.mimetype === "application/pdf" || isPdfName) {
        cb(null, true);
        return;
    }

    cb(new Error("Only PDF files allowed"), false);
};

export const uploadResume = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})
