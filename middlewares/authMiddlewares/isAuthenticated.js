module.exports = (req, res, next) => {
    if(!res.locals.authPayload.isAuthenticated) {
        req.flash("isError", true);
        req.flash("errorMessage", "Please login to perform the task");
        return res.redirect('/login');
    }
    return next();
}