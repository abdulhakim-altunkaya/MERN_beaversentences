const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const DataModel = require("./DataModel");
const ModelEngpor = require("./ModelEngpor");
const connectDB = require("./Database");
connectDB();


const app = express();

//we need cors middleware here because frontend and backend run on different ports.
const cors = require("cors");
app.use(cors());


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Middleware to parse POST body data. This is needed for "post" requests below
app.use(express.json({ extended: false }));


// API route
app.get('/readfromserver', (req, res) => {
    res.json({ message: "Hello from the server!" });
});
 
// Handle any requests that don't match the above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.post("/writetodatabase", async (req, res) => {
  try {
    const {content} = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
})

app.post("/engpor", async (req, res) => {
  try {
    const {SentenceEng, SentencePor} = req.body;
    const newData = new ModelEngpor({SentenceEng, SentencePor});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});

app.get('/sentences/search', async (req, res) => {
  const { word } = req.query;

  try {
    const sentences = await ModelEngpor.find({
      SentenceEng: { $regex: new RegExp(word, 'i') },
    });

    res.json(sentences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/test3/search', (req, res) => {
  const { searchTerm } = req.query; // Access the query parameter
  console.log(searchTerm);
  try {
    res.status(200).json({ myMessage: `word processed: ${searchTerm}121231231231` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'server.js try catch error' });
  }
});


// GET route with route parameter (useParams)
app.get('/api/param-route/:id', (req, res) => {
  const { id } = req.params;
  console.log('Received route parameter:', id);

  try {
    res.status(200).json({ myMessage: `Received route parameter: ${id}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route with query parameter
app.get('/api/query-route', (req, res) => {
  const { param } = req.query;
  console.log('Received query parameter:', param);

  try {
    res.status(200).json({ myMessage: `Received query parameter: ${param}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST route with route parameter and request body
app.post('/api/body-route/:id', (req, res) => {
  const { id } = req.params;
  const { inputField } = req.body;
  console.log('Received route parameter:', id);
  console.log('Received input field in request body:', inputField);

  try {
    res.status(200).json({ myMessage: `Received route parameter: ${id}, input field: ${inputField}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/goodquery", async (req, res) => {
  try {
    let searchword = req.query.myinputfrontend;
    console.log(searchword);
    const sentences = await ModelEngpor.find({
      SentenceEng: { $regex: new RegExp(searchword, 'i') },
    });
    console.log(sentences)
    
    res.json({ myReplyfromServer: `Received query data: ${searchword} ` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
