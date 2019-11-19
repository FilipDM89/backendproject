const mongoose = require("mongoose");

//SCHEMA

const historyArticleSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String,
	created: {
		type: Date, 
		default: Date.now
	}
});

module.exports = mongoose.model("historyArticle", historyArticleSchema)
