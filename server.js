const express = require("express");
const mongoose = require("mongoose");
const path = require('path');


const DataModel = require('./DataModel');
const connectDB = require("./Database");

const app = express();
connectDB();

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

// Middleware to parse POST body data
app.use(express.json({ extended: false }));

app.post('/api', async (req, res) => {
    try {
        const { content } = req.body;
        const newData = new DataModel({ content });
        await newData.save();
        res.json({ message: 'Data saved very successfully!' });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Server error');
    }
});

app.get('/readdata', async (req, res) => {
    try {
        const allData = await DataModel.find(); // Fetch all data from your MongoDB collection
        res.json(allData);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
    }
});



const server = app.listen(process.env.PORT || 5000);
const portNumber = server.address().port;
console.log(`Server is running on PORT ${portNumber}`);
