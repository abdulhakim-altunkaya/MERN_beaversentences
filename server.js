const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const ModelEngpor = require("./Models/ModelEngpor");
const ModelEngtur = require("./Models/ModelEngtur");
const ModelEngger = require("./Models/ModelEngger");
const ModelGertur = require("./Models/ModelGertur");
const ModelEngesp = require("./Models/ModelEngesp");
const ModelPortur = require("./Models/ModelPortur");
const ModelEngturTech = require("./Models/ModelEngturTech");

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



//REQUEST LIMITING MIDDLEWARE
//Limiting requests per IP address to prevent robots overwhelming website
const rateLimit = require("express-rate-limit");
//limiter options
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limiting each IP to 10 requests per windowMs
  message: { error: "Too many requests from this IP, please try again later." },
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
app.post("/api/engtur", async (req, res) => {
  try {
    const {SentenceEng, SentenceTur} = req.body;
    const newData = new ModelEngtur({SentenceEng, SentenceTur});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});
app.post("/api/engger", async (req, res) => {
  try {
    const {SentenceEng, SentenceGer} = req.body;
    const newData = new ModelEngger({SentenceEng, SentenceGer});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});
app.post("/api/engesp", async (req, res) => {
  try {
    const {SentenceEng, SentenceEsp} = req.body;
    const newData = new ModelEngesp({SentenceEng, SentenceEsp});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});
app.post("/api/gertur", async (req, res) => {
  try {
    const {SentenceGer, SentenceTur} = req.body;
    const newData = new ModelGertur({SentenceGer, SentenceTur});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});
app.post("/api/portur", async (req, res) => {
  try {
    const {SentencePor, SentenceTur} = req.body;
    const newData = new ModelPortur({SentencePor, SentenceTur});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});
app.post("/api/techet", async (req, res) => {
  try {
    const {SentenceEng, SentenceTur} = req.body;
    const newData = new ModelEngturTech({SentenceEng, SentenceTur});
    await newData.save();
    res.json({message: "Data saved successfully / Данные сохранены"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).send("Server error while saving data/Ошибка сервера при сохранении данных")
  }
});







app.post("/api/engpor/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
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
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/poreng/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
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
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/engtur/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
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
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/tureng/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
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
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});

app.post("/api/turger/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelGertur.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/gertur/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelGertur.find({
      SentenceGer: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/engger/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngger.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/gereng/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngger.find({
      SentenceGer: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/engesp/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      return res.status(400).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      return res.status(400).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngesp.find({ 
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/espeng/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngesp.find({
      SentenceEsp: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/portur/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelPortur.find({
      SentencePor: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/turpor/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelPortur.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/techet/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngturTech.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});
app.post("/api/techte/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 4 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngturTech.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: sentences, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({errorMessage: "Server error: word search failed"});
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});


/*
Remove all test compnents and server routes 
Limit the number of results, and put extra results in a separate array for extra display. 
  user will need to click again for extra display of additional results. Extra results will either come 
  down under existing results or will replace them.
Fix footer part when many results display and overflew vertically
Domain register with Render.com
pay Render.com for hosting website
Add files to mongodb
mongodb scaling
To make it more secure, some names can be moved into dotenv file
*/

