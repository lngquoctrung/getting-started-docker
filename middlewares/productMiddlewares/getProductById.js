const productHelper = require("../../helpers/productHelper");

module.exports = async (req, res, next) => {
    const productID = req.params.id;
    try {
        res.locals.product = await productHelper.getProductById(productID);
        return next();
    } catch (error) {
        console.error(error);
    }
}