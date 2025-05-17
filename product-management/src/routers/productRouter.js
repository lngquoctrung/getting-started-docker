const express = require('express');
const productController = require("../controllers/productController");
const uploader = require("../middlewares/uploadMiddlewares/uploader");
const validMiddlewares = require("../middlewares/validMiddlewares");

const productRouter = express.Router();

productRouter.post(
    "/",
    uploader,
    validMiddlewares.validationRules.addProduct,
    validMiddlewares.productValidationResult,
    productController.createProduct,
);

module.exports = productRouter;