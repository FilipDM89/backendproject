const express = require("express");
const router  = express.Router({mergeParams: true});
const passport= require("passport");
const user    = require("../models/user"); 

//====================
//AUTHENTICATION ROUTE
//==================== 

//shows registration form
router.get("/signup", (req, res)=> {
    res.render("authentication/signup")
});

//receives and handles new user data
router.post("/signup", (req, res)=> {
	let newUser = new user({username: req.body.username});
	user.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err)
			return res.render("signup")
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("index")
			});
		};
	});
});

//Login Page
router.get("/login", (req, res)=> {
    res.render("authentication/login")
});

//Login Logic
router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}) ,(req, res) => {
	// console.log(req);
});

//Logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}
//ACHTERAF NIET VERGETEN BIJ COMMENTS DE MIDDLEWARE TE REQUIREN
//SECTIE 347 MINUUT 7:28 KIJKEN OM TE ZIEN HOE DAT MOET

module.exports = router;