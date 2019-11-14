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
   //retrieves articles from the database
	historyArticle.find({}, (err, historyarticles) => {
		if(err){
			console.log(err)
		} else {
			res.render("history", {historyarticles: historyarticles})
		};
	});
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


//PORT LISTEN

app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});
