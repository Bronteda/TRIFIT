//--Imports--
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
//--Create app--
const app = express();

//--Port--
const port = process.env.PORT ? process.env.PORT : 3000;

//--connect db--

const connectDB = async () => {
  try {
    //connect to the db
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  } catch (e) {
    console.log("Cannot connect to MongoDB", e);
    process.exit(1); // Stop the app if DB connection fails
  }
};

//--Controllers--
const authController = require("./controllers/auth.js");
const activitiesController = require("./controllers/activities.js");
const trainingPlanController = require("./controllers/trainingPlan.js");
const dashboardController = require("./controllers/dashboard.js");

//-- Session Middleware--
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

//--Middleware--
//this is to help read req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// Set EJS as view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: true,
  }),
);

//--Routes--

//--Before login--
app.use(passUserToView);

app.get("/", (req, res) => {
  if (req.session.user) {
    // User is signed in
    res.redirect("/dashboard");
  } else {
    // Not signed in
    res.render("index.ejs");
  }
});

//--After login page--
app.use("/auth", authController);
app.use(isSignedIn); //This means all the routes after isSignedIn require a signed-in user.
app.use("/activities", activitiesController);
app.use("/trainingPlan", trainingPlanController);
app.use("/dashboard", dashboardController);

//--Start Server--
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
