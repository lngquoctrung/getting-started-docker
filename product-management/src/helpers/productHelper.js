const productModel = require('../models/productModel');

class ProductHelper {
    async getAllProducts() {
        try {
            return await productModel.find({}, null, null).lean();
        } catch(error) {
            console.error(error);
        }
    }

    async createProduct(product) {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return newProduct;
        } catch(error) {
            console.error(error);
        }
    }

    async getProductById(id) {
        try {
            return await productModel.findById(id, null, null).lean();
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = new ProductHelper();