const express = require("express");
const mongoose = require("mongoose");

const DataModel = require('./DataModel');
const connectDB = require("./Database");

const app = express();
connectDB();

// Middleware to parse POST body data
app.use(express.json({ extended: false }));

app.post('/api', async (req, res) => {
    try {
        const { content } = req.body;
        const newData = new DataModel({ content });
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
