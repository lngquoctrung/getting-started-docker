const productHelper = require("../helpers/productHelper");

const createProduct = async (req, res) => {
    const serverURL = `http://${process.env.HOST}:${process.env.PORT}`;
    const productImage = `${serverURL}/${req.file.path}`;
    try {
        const newProduct = await productHelper.createProduct({
            productImage,
            ...req.body
        });
        return res.redirect("/");
    } catch(error) {
        req.flash("errorStatus", 500);
        req.flash("errorMessage", "Internal server error");
        return res.redirect("/error");
    }
}

module.exports = {
    createProduct
}