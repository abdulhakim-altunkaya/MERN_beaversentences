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
const ModelVisitorNum = require("./Models/ModelVisitorNum");

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


//MIDDLEWARE TO COUNT WEBSITE VISITOR:
//Each page load for any route, will be saved as visitor.
// Middleware to count page views for the index route
app.use("/", async (req, res, next) => {
  try {


    if (req.path === "/") {
          // Find the first document in ModelVisitorNum. I said "all" because
    //I didnt provide any condition in "findOne()". So, it will grab the first document 
    //which is what I want. I only have one document.
    const visitorCountDoc = await ModelVisitorNum.findOne();
    // If the document doesn't exist, create a new one
    if (!visitorCountDoc) {
      await ModelVisitorNum.create({ VisitorNumIndex: 1,  VisitorNumOther: 0});
    }
      // Increment the visitor count
      await ModelVisitorNum.updateOne({}, { $inc: { VisitorNumIndex: 1 } });
    } else {
          // Find the first document in ModelVisitorNum. I said "all" because
    //I didnt provide any condition in "findOne()". So, it will grab the first document 
    //which is what I want. I only have one document.
    const visitorCountDoc = await ModelVisitorNum.findOne();
    // If the document doesn't exist, create a new one
    if (!visitorCountDoc) {
      await ModelVisitorNum.create({ VisitorNumIndex: 1,  VisitorNumOther: 0});
    }
      // Increment the visitor count
      await ModelVisitorNum.updateOne({}, { $inc: { VisitorNumOther: 1 } });
    }
    next();
  } catch (error) {
    console.log(error.message);
    req.status(500).send("Internal server error");
  }
})


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










app.post("/api/delete/portur", limiter, async (req, res) => {
  try {
    await ModelPortur.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});
app.post("/api/delete/engtur", limiter, async (req, res) => {
  try {
    await ModelEngtur.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});
app.post("/api/delete/engger", limiter, async (req, res) => {
  try {
    await ModelEngger.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});
app.post("/api/delete/engesp", limiter, async (req, res) => {
  try {
    await ModelEngesp.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});
app.post("/api/delete/engpor", limiter, async (req, res) => {
  try {
    await ModelEngpor.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});
app.post("/api/delete/gertur", limiter, async (req, res) => {
  try {
    await ModelGertur.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});
app.post("/api/delete/techet", limiter, async (req, res) => {
  try {
    await ModelEngturTech.deleteMany({});
    res.status(202).json({message: "Server: Collection deletion successful"})
  } catch (error) {
    console.log("Ошибка сервера при сохранении данных", error.message);
    res.status(500).json({errorMessage: "Server error: collection deletion failed"});
  }
});













app.post("/api/engpor/search", limiter, async (req, res) => {
  try {
    let searchword = req.query.word;
    let languagePair = req.query.pair;
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngpor.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngpor.find({
      SentencePor: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngtur.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngtur.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelGertur.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelGertur.find({
      SentenceGer: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngger.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngger.find({
      SentenceGer: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      return res.status(400).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      return res.status(400).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngesp.find({ 
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngesp.find({
      SentenceEsp: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelPortur.find({
      SentencePor: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelPortur.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngturTech.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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
    if (searchword.length < 3 ) {
      res.status(500).json({ errorMessage: "Server error: your search word is too short" });
    }
    if (languagePair < 0 || languagePair > 14) {
      res.status(500).json({ errorMessage: "Server error: no valid language pair" });
    }
    const sentences = await ModelEngturTech.find({
      SentenceTur: { $regex: new RegExp(searchword, "iu")},
    });
    let resultsArray = sentences.slice(0, 30);
    
    res.status(200).json({
      serverMessage: "Server message: word successfully searched",
      serverResults: resultsArray, 
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

