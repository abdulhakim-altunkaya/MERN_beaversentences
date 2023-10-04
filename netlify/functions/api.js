const mongoose = require("mongoose");
const DataModel = require('../../DataModel'); // Adjust the path

exports.handler = async function(event, context) {
  const { content } = JSON.parse(event.body);

  try {
    await mongoose.connect(process.env.SERVER_MONGODB_URI); // Use environment variable for Mongo URI
    const newData = new DataModel({ content });
    await newData.save();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data saved successfully!" })
    };
  } catch (err) {
    console.error('Error saving data:', err);
    return {
      statusCode: 500,
      body: 'Server error'
    };
  }
};
