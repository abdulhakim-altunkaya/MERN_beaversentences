const mongoose = require("mongoose");
const SchemaEngger = new mongoose.Schema({
    SentenceEng: {
        type: String,
        required: true
    },
    SentenceGer: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("ModelEngger", SchemaEngger);