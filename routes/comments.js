const express 		= require("express");
const router  		= express.Router({mergeParams: true});
const commentArticle= require("../models/comment"); 
const historyArticle= require("../models/historyarticle");

//NEW COMMENTS

router.get("/history/:id/comments/new", isLoggedIn, (req, res) => {
    historyArticle.findById(req.params.id, (err, historyarticle) => {
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {historyarticle: historyarticle});
        }
    }); 
});

//SEND COMMENT

router.post("/history/:id/comments", isLoggedIn, (req, res) => {
    historyArticle.findById(req.params.id, (err, historyarticle) => {
        if(err){
            console.log(err);
            res.redirect("/history");
        } else {
            commentArticle.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    historyarticle.comments.push(comment);
                    historyarticle.save();
                    res.redirect("/history/" + historyarticle._id);
                    console.log(comment)
                }
            });
        }
    });
});

function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
};

module.exports = router;
