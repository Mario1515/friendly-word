const router = require("express").Router();
const animalService = require("../services/animalService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/all", async (req, res) => {
  const animals = await animalService.getAll().lean();

  res.render("post/dashboard", { animals });
});

router.get("/create",isAuth, (req, res) => {
  res.render("post/create");
});

router.post("/create",isAuth, async (req, res) => {
  const { name, years, kind, image, need, location, description } = req.body;
  const payload = {
    name,
    years,
    kind,
    image,
    need,
    location,
    description,
    owner: req.user,
  };

  try {
    await animalService.create(payload);
    res.redirect("/posts/all");
  } catch (err) {
    const errorMessages = extractErrorMsgs(err);
    res.status(404).render("post/create", { errorMessages });
  }
});

router.get("/:animalId/details", async (req, res) => {
  const { animalId } = req.params;

  const animal = await animalService.getSingleAnimal(animalId).lean();

  const { user } = req;
  const { owner } = animal;

  const isOwner = user?._id === owner.toString();

const hasDonated = animal.donations?.some((d) => d?._id.toString() === user?._id);

  res.render("post/details", { animal, isOwner, hasDonated });

  // res.render("post/details", { creature, isOwner, hasVoted, joinedEmailsOfOwners});
});

router.get("/:animalId/edit", isAuth, async (req, res) => {
  const { animalId } = req.params;

  const animal = await animalService.getSingleAnimal(animalId).lean();

  res.render("post/edit", { animal });
});

router.post("/:animalId/edit", isAuth, async (req, res) => {
  const { animalId } = req.params;
  const { name, years, kind, image, need, location, description } = req.body;
  const payload = {
    name,
    years,
    kind,
    image,
    need,
    location,
    description,
    owner: req.user,
  };

  await animalService.update(animalId, payload);

  res.redirect(`/posts/${animalId}/details`);
});

router.get("/:animalId/delete", isAuth, async (req, res) => {
  const { animalId } = req.params;

  await animalService.delete(animalId);

  res.redirect("/posts/all");
});

router.get("/:animalId/donation", async (req, res) => {
  const { animalId } = req.params;
  const { _id } = req.user;

  try {
    await animalService.addDonationToAnimal(animalId, _id);
    res.redirect(`/posts/${animalId}/details`);
  } catch (err) {
    const errorMessages = extractErrorMsgs(err);
    res.status(404).render(`/posts/${animalId}/details`, { errorMessages });
  }
});

router.get("/search", async (req, res) => {
    const animals = await animalService.getAll().lean();

    res.render("post/search", { animals });
});

router.post("/search", async (req, res) => {
    const { search } = req.body;
    const searchData = { search };

    try {
    const animals = await animalService.search(searchData);
    
    res.render("post/search", { animals } );

    } catch (err){
    const errorMessages = extractErrorMsgs(err);
    res.status(404).render("post/search", { errorMessages });
    }
    
});



module.exports = router;
