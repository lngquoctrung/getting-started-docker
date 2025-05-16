const jwt = require('jsonwebtoken');
const tokenConfig = require('../config/tokenConfig');

class TokenHelper {
    sign(payload) {
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, tokenConfig);
        } catch(error) {
            console.error(error);
        }
    }

    verify(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = new TokenHelper();