const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//import our models
const Activity = require("../models/activity");

//import our utils - helper functions
const {
  totalMinutesCalculated,
  separateDuration,
  formatDuration,
} = require("../utils/format-duration");
const getWeekDates = require("../utils/dateHelper");
const User = require("../models/user");

// Home page of the training plan link
router.get("/", async (req, res) => {
  try {
    //getting Monday and sunday of the current week
    const todayDate = new Date();
    const { monday, sunday } = getWeekDates(todayDate);

    //sorting all the users activities by date recent first
    const activities = await Activity.find({
      owner: req.session.user._id,
    });

    const activitiesSorted = activities.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    //console.log(activitiesSorted);

    const currentWeekActivities = activitiesSorted.filter((activity) => {
      return activity.date >= monday && activity.date <= sunday;
    });

    const mondayActivities = activitiesSorted.filter((activity) => {
      //console.log("activity.date", activity.date.toDateString, "monday", monday.toDateString(10));
      return activity.date.toDateString(10) === monday.toDateString(10);
    });

    console.log(mondayActivities);

    res.send(`Monday of the current week ${monday} and Sunday ${sunday}`);
  } catch (e) {
    console.log("Couldn't display Training Plan index", e);
    res.status(500).send("Couldn't display Training Plan index");
  }
});

module.exports = router;
