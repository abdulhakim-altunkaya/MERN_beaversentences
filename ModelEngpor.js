const mongoose = require("mongoose");
const SchemaEngpor = new mongoose.Schema({
    SentenceEng: {
        type: String,
        required: true
    },
    SentencePor: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("ModelEngpor", SchemaEngpor);