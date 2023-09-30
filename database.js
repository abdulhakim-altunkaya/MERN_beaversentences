const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/your-database-name";

const client = new MongoClient(uri {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { connectToDatabase, client }
