const mongoose = require("mongoose");

//SCHEMA

const historyArticleSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String,
	created: {
		type: Date, 
		default: Date.now
	},
	comments: [
		{
		type: mongoose.Schema.Types.ObjectId,
		ref: "commentArticle"
		}
	]
});

module.exports = mongoose.model("historyArticle", historyArticleSchema)
