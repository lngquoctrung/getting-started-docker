const tokenHelper = require('../../helpers/tokenHelper');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const payload = token ? tokenHelper.verify(token) : null;
        res.locals.authPayload = {
            isAuthenticated: !!payload,
            ...(payload || {}),
        }
        return next();
    } catch(error) {
        res.locals.authPayload = {
            isAuthenticated: false,
        }
        return next();
    }
}