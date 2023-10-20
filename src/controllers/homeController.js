const router = require("express").Router();
const animalService = require("../services/animalService");

//routes
router.get("/", async (req, res) => {
    const animals = await animalService.getAll().lean();
    res.render("home", { animals })
});

router.get("/404", (req, res) => {
   res.render("404"); 
});

module.exports = router;