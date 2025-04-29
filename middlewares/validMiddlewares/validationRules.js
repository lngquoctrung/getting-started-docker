const { body } = require('express-validator');

module.exports = {
    register: [
        body('username')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a username'),
        body('email')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter an email')
            .isEmail()
            .withMessage( 'Please enter a valid email'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a password')
            .isLength({ min: 6 })
            .withMessage( 'Password must be at least 6 characters long'),
        body('cfmPassword')
            .trim()
            .notEmpty()
            .withMessage( 'Please confirm your password')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            })
    ],
    login: [
        body('email')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter an email')
            .isEmail()
            .withMessage( 'Please enter a valid email'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a password')
    ],
    addProduct: [
        body('productName')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a product name')
            .isLength({ min: 3 })
            .withMessage( 'Product name must be at least 3 characters long'),
        body('productPrice')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a product price')
            .custom((value) => {
                if(!/\d+\.?\d*/.test(value))
                    throw new Error('Please enter a valid price');
                return true;
            }),
        body('productQuantity')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a product quantity')
            .isNumeric()
            .withMessage( 'Please enter a valid quantity'),
        body('productDescription')
            .trim()
            .notEmpty()
            .withMessage( 'Please enter a product description')
    ]
}