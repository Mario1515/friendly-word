const router = require("express").Router();

//routes
router.get("/", (req, res) => {
    res.render("home")
});

router.get("/404", (req, res) => {
   res.render("404"); 
});

module.exports = router;