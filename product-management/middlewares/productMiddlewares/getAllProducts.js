const productHelper = require('../../helpers/productHelper');

module.exports = async (req, res, next) => {
    try {
        res.locals.products = await productHelper.getAllProducts();
        return next();
    } catch(error) {
        console.error(error);
    }
}