const express = require("express");
const mongoose = require("mongoose");
const Data = require('./DataModel');

const app = express();

const uri = "mongodb+srv://altunkaya2:190824@cluster0.nolqla7.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("connected to MONGODB");
    } catch (error) {
        console.log(error.message);
    }
}
connectDB();

// Middleware to parse POST body data
app.use(express.json({ extended: false }));

app.post('/api', async (req, res) => {
    try {
        const { content } = req.body;
        const newData = new Data({ content });
        await newData.save();
        res.json({ message: 'Data saved successfully!' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Server error');
    }
});

const server = app.listen(process.env.PORT || 5000);
const portNumber = server.address().port;
console.log(`Server is running on port ${portNumber}`);
