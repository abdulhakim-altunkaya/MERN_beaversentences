const mongoose = require("mongoose");
const SchemaPortur = new mongoose.Schema({
    SentencePor: {
        type: String,
        required: true
    },
    SentenceTur: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("ModelPortur", SchemaPortur);