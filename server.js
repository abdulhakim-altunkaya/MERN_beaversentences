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

app.get('/engpor/search', async (req, res) => {
  const { word } = req.query;

  try {
    // Use MongoDB's $regex operator to perform a case-insensitive word search
    const sentences = await Sentence.find({
      sentenceText: { $regex: new RegExp(word, 'iu') },//i means insensitive search, and u means all unicode characters like ö, ü, ...
    });
    res.json(sentences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
