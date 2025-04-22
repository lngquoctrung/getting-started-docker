const userModel = require('../models/userModel');

class UserHelper {
    async createUser(user) {
        try {
            const newUser = new userModel(user);
            await newUser.save();
            return newUser;
        } catch(error) {
            console.error(error);
        }
    }

    async getAllUsers() {
        try {
            return await userModel.find({}, null, null).lean();
        } catch(error) {
            console.error(error);
        }
    }

    async getUser(filter) {
        try {
            return await userModel.findOne(filter, null, null).lean();

        } catch(error) {
            console.error(error);
        }
    }

    async getUserById(id) {
        try {
            return await userModel.findById(id, null, null).lean();
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = new UserHelper();