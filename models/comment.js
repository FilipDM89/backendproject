const mongoose = require("mongoose");

//SCHEMA

const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String, 
    },
    created: {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model("commentArticle", commentSchema);