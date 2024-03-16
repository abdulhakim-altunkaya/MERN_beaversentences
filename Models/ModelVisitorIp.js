const mongoose = require("mongoose");
const SchemaVisitorIp = new mongoose.Schema({
    VisitNumber: {
        type: Number,
        default: 0,
    },
    IpAddress: {
        type: String,
        default: "Ip Not Detected",
    },
    TimeStamp: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model("ModelVisitorIp", SchemaVisitorIp);
