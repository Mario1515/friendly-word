const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  try {
    const token = await userService.register({
      email,
      password,
      repeatPassword,
    });
    res.cookie("token", token, { httpOnly: true });
    console.log("Registration was successful here is the token " + token); //to be deleted

    res.redirect("/");
  } catch (error) {
    console.log(error);
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("user/register", { errorMessages });
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);
    res.cookie("token", token, { httpOnly: true });

    console.log("Login was successful here is the token " + token); //to be deleted
    res.redirect("/");
  } catch (error) {
    console.log(error);
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("user/login", { errorMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
