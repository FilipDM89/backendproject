const mongoose = require("mongoose");

//SCHEMA

const commentSchema = new mongoose.Schema({
    author: String,
    text: String,
    created: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model("commentArticle", commentSchema);