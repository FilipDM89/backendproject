//SETUP
const express       = require("express");
const app           = express();
const bodyParser    = require("body-parser");
const port          = process.env.PORT || 1837;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//ROUTES

app.get("/", (req, res)=> {
 res.render("landing")
})

app.get("/history", (req, res)=> {
    res.render("history")
   })

//PORT LISTEN
app.listen(port, function(){
    console.log("Age of Imperialism server has started!")
});