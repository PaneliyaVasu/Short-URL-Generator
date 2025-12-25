const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true
    },
    visitedHistory: [{ timeStamp: Number }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);

module.exports = { URL };