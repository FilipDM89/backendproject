const express 		= require("express");
const router  		= express.Router({mergeParams: true});
const historyArticle= require("../models/historyarticle");


//Retrieves articles from DB
router.get("/history", (req, res)=> {
    //retrieves articles from the database
     historyArticle.find({}, (err, historyarticles) => {
         if(err){
             console.log(err)
         } else {
			 res.render("history", {historyarticles: historyarticles, currentUser: req.user})
         };
     });
 });

//=============
//CREATE ROUTE
//=============

router.get("/history/new", (req, res) => {
	res.render("new")
}); //has to be above the post statement

 router.post("/history", (req, res) => {
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

//==========
//SHOW ROUTE
//==========

router.get("/history/:id", (req, res) =>{
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

router.get("/history/:id/edit", (req, res) => {
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


 router.put("/history/:id", (req, res) => {
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

router.delete("/history/:id", (req, res) => {
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

module.exports = router;