const express = require("express");
const router = express.Router({ mergeParams: true });
const historyArticle = require("../models/historyarticle");

//Retrieves articles from DB
router.get("/history", (req, res) => {
  //retrieves articles from the database
  historyArticle.find({}, function(err, historyarticles) {
    if (err) {
      console.log(err);
    } else {
      res.render("history", {
        historyarticles: historyarticles,
        currentUser: req.user
      });
    }
  });
});

// router.get("/history/:page", async (req, res, next) => {
//   const resPerPage = 6;
//   const page = 1;
//   try {
//     if (req.query.search) {
//       const searchQuery = req.query.search,
//         regex = new RegExp(escapeRegex(req.query.search), "gi");
//       const foundArticles = await historyArticle
//         .find({ name: regex })
//         .skip(resPerPage * page - resPerPage)
//         .limit(resPerPage);
//       const numOfArticles = await historyArticle.count({ name: regex });
//       res.render("history"),
//         {
//           articles: foundArticles,
//           currentPage: page,
//           pages: Math.ceil(numOfArticles / resPerPage),
//           searchVal: searchQuery,
//           numOfResults: numOfArticles
//         };
//     }
//   } catch {
//     throw new Error(err);
//   }
// });

//=============
//CREATE ROUTE
//=============

router.get("/history/new", (req, res) => {
  res.render("new");
}); //has to be above the post statement
router.post("/history", (req, res) => {
  //creates new article
  historyArticle.create(req.body.historyarticle, (err, newHistoryArticle) => {
    if (err) {
      console.log(err);
    } else {
      //if made succesfully, it is sent to history
      res.redirect("/history");
    }
  });
});

//==========
//SHOW ROUTE
//==========

router.get("/history/:id", (req, res) => {
  //finds article by its id number first
  historyArticle
    .findById(req.params.id)
    .populate("comments")
    .exec((err, foundArticle) => {
      if (err) {
        res.render("history");
      } else {
        res.render("show", { historyarticle: foundArticle });
      }
    });
});

//==========
//EDIT ROUTE
//==========

router.get("/history/:id/edit", (req, res) => {
  historyArticle.findById(req.params.id, (err, foundArticle) => {
    if (err) {
      res.redirect("history");
    } else {
      res.render("edit", { historyarticle: foundArticle });
    }
  });
});

//============
//UPDATE ROUTE
//============

router.put("/history/:id", (req, res) => {
  historyArticle.findByIdAndUpdate(
    req.params.id,
    req.body.historyarticle,
    (err, editedArticle) => {
      if (err) {
        res.redirect("history");
      } else {
        res.redirect("/history/" + req.params.id);
      }
    }
  );
});

//============
//DELETE ROUTE
//============

router.delete("/history/:id", (req, res) => {
  //destroy blog
  historyArticle.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    } else {
      //redirect somewhere
      res.redirect("/history");
    }
  });
});

module.exports = router;
