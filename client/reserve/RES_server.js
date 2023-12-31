const express = require('express');
const path = require('path');
const mongoose = require("mongoose");

const DataModel = require("./DataModel");
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

// API route
app.get('/readfromserver', (req, res) => {
    res.json({ message: "Hello from the server!" });
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

app.post("/engtur", async (req, res) => {
  try {
    const {SentenceEng, SentenceTur} = req.body;
    const newData = new ModelEngtur({SentenceEng, SentenceTur});
    await newData.save();
    res.status(200).json({message: "Greetings from Server: Data saved successfully"})
  } catch (error) {
    console.log("server side error", error.message);
    res.status(500).json({message: `an error happened on server side: ${error.message}`});
  }
})

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


app.post("/api/goodquery", async (req, res) => {
  try {
    let searchword = req.query.myinputfrontend;
    console.log(searchword);
    const sentences = await ModelEngpor.find({
      SentenceEng: { $regex: new RegExp(searchword, 'iu') },
    });
    console.log(sentences);
    
    res.status(200).json({ 
      myReplyfromServer: `Received query data: ${searchword} `,
      myArrayfromServer: sentences
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/query", async (req, res) => {
  try {
    let searchword = req.query.search;
    let languagePair = req.query.pair;
    let resultsArray = [];

    if (searchword.length < 4 ) {
      res.status(500).json({ error: "your search word is too short" });
    }
    
    if (languagePair == 1) {
      const sentences1 = await ModelEngtur.find({
        SentenceEng: { $regex: new RegExp(searchword, "iu")},
      });
      resultsArray = sentences1;
    } else if(languagePair == 2 ) {
      const sentences1 = await ModelEngtur.find({
        SentenceEng: { $regex: new RegExp(searchword, "iu")},
      });
      resultsArray = sentences1;
    } else if(languagePair == 3 ) {
      const sentences1 = await ModelEngpor.find({
        SentenceEng: { $regex: new RegExp(searchword, "iu")},
      });
      resultsArray = sentences1;
    } else if(languagePair == 4 ) {
      const sentences1 = await ModelEngpor.find({
        SentenceEng: { $regex: new RegExp(searchword, "iu")},
      });
      resultsArray = sentences1;
    } else {
      res.status(500).json({ error: "Server: language pair not detected. Please refresh page and choose langauge pair" });
    }
    console.log(resultsArray);
    
    if (languagePair == 1) {
      console.log("hey 1")
    } else if(languagePair == 2 ) {
      console.log("hey 2")
    } else if(languagePair == 3 ) {
      console.log("hey 3")
    } else if(languagePair == 4 ) {
      console.log("hey 4")
    } else {
      res.status(500).json({ error: "Server: language pair not detected. Please refresh page and choose langauge pair" });
    }

    
    const sentences = await ModelEngpor.find({
      SentenceEng: { $regex: new RegExp(searchword, "iu")},
    });
    
    res.status(200).json({
      serverMessage: "You successfully searched",
      serverResults: resultsArray, 
    });
  } catch (error) {
    console.log("Server error: ", error.message);
    res.status(500).json({ error: "server error" });
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

