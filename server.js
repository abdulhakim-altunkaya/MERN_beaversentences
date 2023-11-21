const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const ModelEngpor = require("./Models/ModelEngpor");
const ModelEngtur = require("./Models/ModelEngtur");
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

//This line is for deployment platforms. Make sure you "npm run build" on client folder first.
app.use(express.static(path.join(__dirname, 'client/build')));
//This line is a catch-all route that handles any GET request that hasn't been matched by other routes. 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// API ROUTES

app.post("/api/engpor", async (req, res) => {
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


app.post("/api/engpor/search", async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ error: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 4) {
      res.status(500).json({ error: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngpor.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Server error: word search failed"});
  }
});
app.post("/api/poreng/search", async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ error: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 4) {
      res.status(500).json({ error: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngpor.find({
      SentencePor: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Server error: word search failed"});
  }
});
app.post("/api/engtur/search", async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ error: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 4) {
      res.status(500).json({ error: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngtur.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Server error: word search failed"});
  }
});
app.post("/api/tureng/search", async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ error: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 4) {
      res.status(500).json({ error: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngtur.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Server error: word search failed"});
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

//check if you need to change the places of sentences on frontend. I mean target language sentences should be on the first column
//different language pairs, different result components. This might solve pair stucking and also dynamic rendering of left side of
//the webpage with target language
/*In route search, make sure component param var name is also "param"
Make a cleanup, for this create another project to move all useparams, re.body and req.query code
Remove all test compnents and server routes 
Extensive error management. Example is in chatgpt
*/

