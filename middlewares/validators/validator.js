const { validationResult } = require('express-validator');
const responseHelper = require('../../helpers/responseHelper');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = errors.array()[0];
        return res.json(responseHelper.error(
            400,
            'INVALID_INPUT',
            error.msg
        ));
    }
    return next();
}