const express = require("express");
const router = express.Router();

//import our models
const Activity = require("../models/activity");

//import our utils - helper functions
const { getWeekDates, getActivitiesOnDate } = require("../utils/dateHelper");
const { sortedActivities } = require("../utils/activityHelper");

// Home page of the training plan link
router.get("/", async (req, res) => {
  try {
    //getting Monday to sunday of the current week
    let todayDate = new Date();
    const week = req.query.week;
    const templateMonday = new Date(Date.parse(req.query.mondayWeek));
    //console.log("monday in ejs",templateMonday);

    // console.log("last week monday",todayDate);
    switch (week) {
      case "prev":
        todayDate = templateMonday.setDate(templateMonday.getDate() - 7);
        break;
      case "next":
        todayDate = templateMonday.setDate(templateMonday.getDate() + 7);
        break;
      case "current":
        todayDate = new Date();
        break;
      default:
        todayDate = new Date();
        break;
    }
    //console.log("todayDate",todayDate);

    //getting Monday to sunday of the current week we are looking at
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } =
      getWeekDates(todayDate);
    //sorting all the users activities by date recent first
    const activities = await Activity.find({
      owner: req.session.user._id,
    });

    const activitiesSorted = sortedActivities(activities);

    const currentWeekActivities = activitiesSorted.filter((activity) => {
      return activity.date >= monday && activity.date <= sunday;
    });

    //console.log(currentWeekActivities);

    //added a helper function to get each days activties.
    const mondayActivities = getActivitiesOnDate(monday, activitiesSorted);
    //console.log("monday activity", mondayActivities);
    const tuesdayActivities = getActivitiesOnDate(tuesday, activitiesSorted);
    const wednesdayActivities = getActivitiesOnDate(
      wednesday,
      activitiesSorted,
    );
    const thursdayActivities = getActivitiesOnDate(thursday, activitiesSorted);
    const fridayActivities = getActivitiesOnDate(friday, activitiesSorted);
    const saturdayActivities = getActivitiesOnDate(saturday, activitiesSorted);
    const sundayActivities = getActivitiesOnDate(sunday, activitiesSorted);

    daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    res.render("trainingPlan/index.ejs", {
      mondayActivities,
      tuesdayActivities,
      wednesdayActivities,
      thursdayActivities,
      fridayActivities,
      saturdayActivities,
      sundayActivities,
      monday,
      sunday,
      daysOfWeek,
    });
  } catch (e) {
    console.log("Couldn't display Training Plan index", e);
    res.status(500).send("Couldn't display Training Plan index");
  }
});

module.exports = router;
