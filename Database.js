require('dotenv').config();
const mongoose = require("mongoose");

const uri = process.env.SERVER_MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connected to MONGODB");
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = connectDB;