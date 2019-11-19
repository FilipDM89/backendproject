//SETUP
const express       = require("express");
let app           	= express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose");
const methodOverride= require("method-override");
const historyArticle= require("./models/historyarticle");
const commentArticle= require("./models/comment.js");
const user 			= require("./models/user"); 
const passport		= require("passport") //necessary for auth
const passportLoc 	= require("passport-local") //necessary for auth
const passportLocal = require("passport-local-mongoose"); //necessary for auth
const port          = process.env.PORT || 1837;

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize()); //part of auth
app.use(passport.session()); //part of auth

passport.serializeUser(user.serializeUser()); //part of auth
passport.deserializeUser(user.deserializeUser()); //part of auth

mongoose.connect("mongodb://localhost/aoi", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

app.use(require("express-session")({
	secret: "Rule Britannia",
	resave: false,
	saveUninitialized: false
})) //part of auth

//=========
//ROUTES
//=========

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

app.get("/history/new", (req, res) => {
	res.render("new")
});

app.get("/weaponry/firearms", (req, res)=> {
	res.render("weaponry/firearms");
   });

//=============
//CREATE ROUTE
//=============

app.post("/history", (req, res) => {
	//creates new article
	historyArticle.create(req.body.historyarticle, (err, newHistoryArticle) => {
		if(err){
			console.log(err);
		} else {
			//if made succesfully, it is sent to history
			res.redirect("/history")
		}
	})
});

app.get("/components/infantry", (req, res)=> {
    res.render("components/infantry")
});

app.get("/components/cavalry", (req, res)=> {
    res.render("components/cavalry")
});


//====================
//AUTHENTICATION ROUTE
//==================== 

//shows sign up form
app.get("/signup", (req, res)=> {
    res.render("authentication/signup")
});

//receives and handles new user data
app.post("/signup", (req, res)=> {
	let newUser = new user({username: req.body.username});
	user.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err)
		} else {
			passport.authenticate("local")(req, res, () => {
				res.render("index")
			});
		};
	});
});


app.get("/login", (req, res)=> {
    res.render("authentication/login")
});


//==========
//SHOW ROUTE
//==========

app.get("/history/:id", (req, res) =>{
	//finds article by its id number first
	historyArticle.findById(req.params.id).populate("comments").exec((err, foundArticle) => {
		if(err){
			res.render("history");
		} else {
			res.render("show", {historyarticle: foundArticle});
		}
	});
});

//==========
//EDIT ROUTE
//==========

app.get("/history/:id/edit", (req, res) => {
	historyArticle.findById(req.params.id, (err, foundArticle) => {
		if(err){
			res.redirect("history");
		} else {
			res.render("edit", {historyarticle: foundArticle});
		}
	});
});

//============
//UPDATE ROUTE
//============

app.put("/history/:id", (req, res) => {
	historyArticle.findByIdAndUpdate(req.params.id, req.body.historyarticle, (err, editedArticle) => {
		if(err){
			res.redirect("history");
		} else {
			res.redirect("/history/" + req.params.id);
		}
	});
});

//============
//DELETE ROUTE
//============ 

app.delete("/history/:id", (req, res) => {
	//destroy blog
	historyArticle.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			console.log(err)
		} else {
			//redirect somewhere
			res.redirect("/history")
		}
	});
});

//===========
//PORT LISTEN
//===========

app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});
