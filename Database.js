const mongoose = require("mongoose");

const uri = "mongodb+srv://altunkaya2:190824@cluster0.nolqla7.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connected to MONGODB");
    } catch (error) {
        console.log(error.message);
    }
}


module.exports = connectDB;