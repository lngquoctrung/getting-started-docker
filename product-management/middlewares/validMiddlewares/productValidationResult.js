const { validationResult } = require('express-validator');
const fs = require("fs");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Remove file in temporary folder
        fs.unlinkSync(req.file.path);
        // Display error message
        const error = errors.array()[0];
        req.flash("formData", req.body);
        req.flash("isError", true);
        req.flash("errorMessage", error.msg);
        return res.redirect("/add");
    }
    return next();
}