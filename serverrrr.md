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








Alright, if you're deploying both the React frontend and Express backend together, with the React app inside the client folder at the root of the project, here's how you should handle the "proxy" setting:

Local Development:

Keep the "proxy": "http://localhost:5000" in the client/package.json. This allows the React development server to forward requests to the Express backend during local development.
Production Deployment:

You don't need the proxy setting for production. Instead, when serving the React app as static files from the Express server, adjust API calls in the React code to relative URLs, not full absolute URLs.
javascript
Copy code
const response = await axios.post('/api', { content: inputData });
This is because, in production, both the React frontend and Express backend are being served from the same domain and port.
Express Setup for Production:
In your server.js, after your API routes, add:

javascript
Copy code
if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}
Deployment:
When you deploy the application, whether it's to a VPS, a platform like Heroku, or any other platform, it will run your Express server. That server, in turn, will serve your React app for any routes not specifically handled by the backend.

In summary, the key difference is that during local development, the React development server and the Express server run on different ports, so you use the proxy setting to connect them. In production, the Express server serves both the API and the React app, so they are on the same domain and port, making the proxy setting unnecessary.