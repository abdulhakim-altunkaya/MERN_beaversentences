const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db");
const Data = require('./DataModel');

const app = express();

// Middleware to parse POST body data
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectDB();

app.get("/favicon.ico", (req, res) => {
    res.sendStatus(204);  // Send a No Content response
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from the server my good sir" });
});

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
