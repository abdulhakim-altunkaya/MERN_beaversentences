
const mongoose = require("mongoose");
const SchemaVisitor = new mongoose.Schema({
    NumVisitor: {
        type: Number,
        default: 0,
    },
});
module.exports = mongoose.model("ModelVisitorNum", SchemaVisitor);