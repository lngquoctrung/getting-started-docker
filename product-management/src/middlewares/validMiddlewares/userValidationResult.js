const { validationResult: userValidationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = userValidationResult(req);
    if(!errors.isEmpty()) {
        console.log(req)
        const error = errors.array()[0];
        req.flash("formData", req.body);
        req.flash("isError", true);
        req.flash("errorMessage", error.msg);
        return res.redirect(req.url);
    }
    return next();
}