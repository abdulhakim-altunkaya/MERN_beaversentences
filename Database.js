require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.SERVER_MONGODB_URI;
const connectDB = async () => {
    try {
       await mongoose.connect(uri);
       console.log("Успех, подключение к MongoDB / Success, connected to MongoDB") 
    } catch (error) {
        console.log("Ошибка подключения:", error.message);
    }
}
module.exports = connectDB;