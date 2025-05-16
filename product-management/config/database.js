const mongoose = require('mongoose');

const MONGODB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const connectDB = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;