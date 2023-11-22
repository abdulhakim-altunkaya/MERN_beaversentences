const mongoose = require("mongoose");
const SchemaGertur = new mongoose.Schema({
    SentenceGer: {
        type: String,
        required: true
    },
    SentenceTur: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("ModelGertur", SchemaGertur);