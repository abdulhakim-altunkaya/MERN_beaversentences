const mongoose = require("mongoose");
const SchemaEngesp = new mongoose.Schema({
    SentenceEng: {
        type: String,
        required: true
    },
    SentenceEsp: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("ModelEngesp", SchemaEngesp);