//SETUP
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const mongoose      = require("mongoose");
const methodOverride= require("method-override");
const historyArticle= require("./models/historyarticle");
const commentArticle= require("./models/comment.js");
const user 			= require("./models/user"); 
const passport		= require("passport") //necessary for auth
const localStrategy = require("passport-local") //necessary for auth
const passportLocal = require("passport-local-mongoose");
const historyRoutes = require("./routes/historyarticles")
const indexRoutes	= require("./routes/index")
const commentRoutes	= require("./routes/comments")
const port          = process.env.PORT || 1837;



mongoose.connect("mongodb://localhost/aoi", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
	secret: "Rule Britannia",
	resave: false,
	saveUninitialized: false
})); //needs to above

app.use(passport.initialize()); //part of auth
app.use(passport.session()); //part of auth


passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); //part of auth
passport.deserializeUser(user.deserializeUser()); //part of auth

 //part of auth

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
    next();
}); //tells all pages currentuser = user

app.use(historyRoutes);
app.use(indexRoutes);
app.use(commentRoutes);

// app.use("/history", historyRoutes); a way to dry the code, later on

//=========
//ROUTES
//=========

app.get("/", (req, res)=> {
 res.render("index");
});


app.get("/weaponry/firearms", (req, res)=> {
	res.render("weaponry/firearms");
   });

app.get("/components/infantry", (req, res)=> {
    res.render("components/infantry")
});

app.get("/components/cavalry", (req, res)=> {
    res.render("components/cavalry")
});


//===========
//PORT LISTEN
//===========

app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});
