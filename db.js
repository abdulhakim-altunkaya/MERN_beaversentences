const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://altunkaya2:190824@cluster0.nolqla7.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
