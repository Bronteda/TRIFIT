const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const passUserToView = require("../middleware/pass-user-to-view");

//models
const User = require("../models/user.js");

router.use(passUserToView);

//Get the sign up page
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs", {
    user: req.user || null,
    notMatching: req.query.notMatching || null,
  });
});

//Create the user after sign up
router.post("/sign-up", async (req, res) => {
  try {
    //check if user already exists
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.redirect("/auth/sign-in?flag=true");
    }

    //Password matches confirm password
    if (req.body.password !== req.body.confirmPassword) {
      return res.redirect("/auth/sign-up?notMatching=true");
    }

    //encrypt password
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashPassword;

    // All ready to create the new user!
    await User.create(req.body);

    res.redirect("/auth/sign-in?newUser=true");
  } catch (e) {
    console.log("Cannot sign up", e);
    res.status(500).send("Cannot sign user up");
  }
});

//sign in page
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs", {
    newUser: req.query.newUser || false,
    flag: req.query.flag || false,
    user: req.user || null,
    failed: req.query.failed || false,
  });
});

//signing the user in
router.post("/sign-in", async (req, res) => {
  try {
    //check user exists in db
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.redirect("/auth/sign-in?failed=true");
    }

    //check if the password is correct
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password,
    );

    if (!validPassword) {
      return res.redirect("/auth/sign-in?failed=true");
    }

    // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    req.session.user = {
      email: userInDatabase.email,
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    res.redirect("/");
  } catch (e) {
    console.log("Cannot sign in", e);
    res.status(500).send("Cannot sign user in");
  }
});

//Sign Out
router.get("/sign-out", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
