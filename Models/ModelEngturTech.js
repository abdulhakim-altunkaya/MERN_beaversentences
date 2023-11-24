const mongoose = require("mongoose");
const SchemaEngtur = new mongoose.Schema({
    SentenceEng: {
        type: String,
        required: true
    },
    SentenceTur: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("ModelEngturTech", SchemaEngtur);