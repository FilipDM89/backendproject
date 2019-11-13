//SETUP
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const port          = process.env.PORT || 1837;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

//test history articles

const historyArticles = [
    {title: "Gatling guns and their impact", image: "https://bit.ly/2NKkjSj", content: "Rapid firing changed the way war was fought drastically forever"},
    {title: "The Slow decline of Cavalry", image:"https://i.pinimg.com/originals/9f/9a/f5/9f9af56734829adc63fca95ef65b6f07.jpg", content:"It took very long for Cavalry to be disbanded as a traditional component of a standing army."},
    {title: "African-American regiments during the Civil War", image:"https://bit.ly/2NK90JV", content: "The abolishment of slavery sadly did not mean the immediate disappearance of racism."}
]

//ROUTES

app.get("/", (req, res)=> {
 res.render("landing");
});

app.get("/history", (req, res)=> {
    res.render("history", {historyArticles: historyArticles})
   });

app.post("/history", (req, res) =>{
    let title = req.body.title;
    let image = req.body.image;
    let content = req.body.content;
    let newHistoryArticle = {title: title, image: image, content: content};
    historyArticles.push(newHistoryArticle);
    res.redirect("/history")
});

//PORT LISTEN
app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});