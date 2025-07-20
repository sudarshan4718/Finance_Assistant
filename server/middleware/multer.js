import multer from "multer";

// multer configuration for file uploads
// Using memory storage to handle files in memory
const storage = multer.memoryStorage(); 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type"), false);
};

export const upload = multer({ storage, fileFilter });
