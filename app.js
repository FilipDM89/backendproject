//SETUP
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose")
const port          = process.env.PORT || 1837;

app.use(bodyParser.urlencoded({extended: true}));
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

//PORT LISTEN

app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});
