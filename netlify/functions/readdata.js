const mongoose = require("mongoose");
const DataModel = require('../../DataModel'); // Adjust the path

exports.handler = async function(event, context) {
  try {
    await mongoose.connect(process.env.SERVER_MONGODB_URI);
    const allData = await DataModel.find();

    return {
      statusCode: 200,
      body: JSON.stringify(allData)
    };
  } catch (err) {
    console.error('Error fetching data:', err);
    return {
      statusCode: 500,
      body: 'Server error'
    };
  }
};
