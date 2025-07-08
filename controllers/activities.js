const express = require("express");

const router = express.Router();

//import our models
const Activity = require("../models/activity");
const User = require("../models/user");

//import our utils - helper functions
const {
  totalMinutesCalculated,
  separateDuration,
  formatDuration,
} = require("../utils/format-duration");
const getWeekDates = require("../utils/dateHelper");
const { sortedActivities } = require("../utils/activityHelper");

//Home page of Activities
router.get("/", async (req, res) => {
  //*Sorted activities from most recent to older

  switch (req.query.activity) {
    case "Run":
      filter1 = "Run";
      break;
    case "Cycle":
      filter1 = "Cycle";
      break;
    case "Swim":
      filter1 = "Swim";
      break;
    case "Race":
      filter1 = "Race";
      break;
    case "All":
      filter1 = ["Run", "Swim", "Cycle"]; //I chose not to add race here because these are based off activities not races
      break;
    default:
      filter1 = ["Run", "Swim", "Cycle"];
      break;
  }

  switch (req.query.completed) {
    case "completed":
      filter2 = true;
      break;
    case "planned":
      filter2 = false;
      break;
    default:
      filter2 = [true, false];
      break;
  }

  const user = req.session.user._id;
  const activities = await Activity.find({
    owner: user,
    activity: filter1,
    completed: filter2,
  });
  const activitiesSorted = sortedActivities(activities);

  res.render("activities/index", {
    activities: activitiesSorted,
  });
});

//Adding a new Activity GET
router.get("/new", (req, res) => {
  const redirect = req.query.redirect || "/activities";
  res.render("activities/new.ejs", { redirect });
});

//Add the new activity to the db POST
router.post("/", async (req, res) => {
  try {
    //get user id
    const user = req.session.user._id;

    //Duration calculated
    const duration = totalMinutesCalculated(req.body.hours, req.body.minutes);

    if (isNaN(duration) || duration < 0) {
      //handle invalid input
      return res.status(400).send("Duration must be a number bigger than 0");
    }

    //Distance
    const distance = parseFloat(req.body.distance);
    if (isNaN(distance) || distance < 0) {
      //handle invalid input
      return res.status(400).send("Distance must be a number bigger than 0");
    }

    //completed parsed correctly - check box
    const completed = req.body.completed === "true";

    const newActivity = new Activity({
      owner: user,
      date: req.body.date || new Date(), // default to today if not set
      activity: req.body.activity,
      duration: duration,
      distance: distance,
      intensity: req.body.intensity,
      completed: completed,
      notes: req.body.notes?.trim() || undefined, //handles empty or missing notes.
    });

    await newActivity.save();

    if (req.body.redirect === "trainingPlan") {
      res.redirect("/trainingPlan");
    } else {
      res.redirect("/activities");
    }
  } catch (e) {
    console.log("Couldn't add the activity to the DB", e);
    res.status(500).send("Couldn't add activity");
  }
});

//show page for each activity
router.get("/:activityId", async (req, res) => {
  const redirect = req.query.redirect || "/activities";
  const activity = await Activity.findById(req.params.activityId);
  const duration = formatDuration(activity.duration);

  res.render("activities/show.ejs", { activity, duration, redirect });
});

//Get router for edit
router.get("/:activityId/edit", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.activityId);
    //Separate hours and minutes - use helper funtion
    const { hours, minutes } = separateDuration(activity.duration);
    console.log("Hours", hours, "Minutes", minutes);
    res.render("activities/edit.ejs", { activity, hours, minutes });
  } catch (e) {
    console.log("Cannot edit the activity", e);
    res.status(500).send("Cannot edit the activity");
  }
});

router.put("/:activityId", async (req, res) => {
  try {
    const currentActivity = await Activity.findById(req.params.activityId);
    //console.log(currentActivity);

    //get user id
    const user = req.session.user._id;

    //Duration calculated
    const duration = totalMinutesCalculated(req.body.hours, req.body.minutes);

    if (isNaN(duration) || duration < 0) {
      //handle invalid input
      return res.status(400).send("Duration must be a number bigger than 0");
    }

    //Distance
    const distance = parseFloat(req.body.distance);
    if (isNaN(distance) || distance < 0) {
      //handle invalid input
      return res.status(400).send("Distance must be a number bigger than 0");
    }

    //completed parsed correctly - check box
    const completed = req.body.completed === "true";

    currentActivity.set({
      owner: user,
      date: req.body.date || new Date(), // default to today if not set
      activity: req.body.activity,
      duration: duration,
      distance: distance,
      intensity: req.body.intensity,
      completed: completed,
      notes: req.body.notes?.trim() || undefined, //handles empty or missing notes.
    });

    await currentActivity.save();

    res.redirect(`/activities/${req.params.activityId}`);
  } catch (e) {
    console.log("Couldn't update the activity to the DB", e);
    res.status(500).send("Couldn't update activity");
  }
});

//delete activity feature
router.delete("/:activityId", async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.activityId);

    if (req.body.redirect === "trainingPlan") {
      res.redirect("/trainingPlan");
    } else {
      res.redirect("/activities");
    }
  } catch (e) {
    console.log("Cannot delete activity", e);
    res.status(500).send("Cannot delete activity");
  }
});

module.exports = router;
