//SETUP
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose")
const port          = process.env.PORT || 1837;

app.use(bodyParser.urlencoded({extended: true}));
app.set(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/aoi", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

//ROUTES

app.get("/", (req, res)=> {
 res.render("index");
});

app.get("/history", (req, res)=> {
   res.render("history")   
});

app.get("/components/infantry", (req, res)=> {
    res.render("components/infantry")
});

app.get("/components/cavalry", (req, res)=> {
    res.render("components/cavalry")
});


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

const historyArticle = mongoose.model("historyArticle", historyArticleSchema)
historyArticle.create({
	title: "test1",
	image: "https://i.pinimg.com/originals/a9/5d/ed/a95ded0add7dea7ec7484d75c554a1a8.jpg",
	content: "testing the content right here",
});

//PORT LISTEN

app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});
