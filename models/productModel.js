const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice : {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
    },
    productImage: {
        type: String,
    },
    productDescription: {
        type: String,
    }
});

module.exports = mongoose.model("Product", productSchema);