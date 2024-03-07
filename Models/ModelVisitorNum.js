const mongoose = require("mongoose");
const SchemaVisitor = new mongoose.Schema({
    VisitorNumIndex: {
        type: Number,
    },
    VisitorNumOther: {
        type: Number,
    }
})
module.exports = mongoose.model("ModelVisitorNum", SchemaVisitor);