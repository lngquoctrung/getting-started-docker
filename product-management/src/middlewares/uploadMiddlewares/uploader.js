const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {MulterError} = require("multer");

const desDirPath = "./uploads/public";
// Create the temporary folder and destination folder
const createDirectory = (directoryPath) => {
    if(!fs.existsSync(directoryPath)) 
        fs.mkdirSync(directoryPath, { recursive: true });
}
createDirectory(desDirPath);

// Define multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, desDirPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname.replaceAll(" ", "-"));
    }
});

const uploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.startsWith("image/"))
            return cb(new Error("Only image allowed"));
        cb(null, true); // File is valid
    },
    limits: {
        fileSize: 5 * 1e6 // 5MB
    }
});

module.exports = (req, res, next) => {
    uploader.single("productImage")(req, res, (err) => {
        if(err instanceof MulterError || err) {
            req.flash("formData", req.body);
            req.flash("isError", true);
            req.flash("errorMessage", err.message);
            return res.redirect("/add");
        }
        else if(!req.file) {
            req.flash("formData", req.body);
            req.flash("isError", true);
            req.flash("errorMessage", "Please upload product image");
            return res.redirect("/add");
        }
        return next();
    });
}