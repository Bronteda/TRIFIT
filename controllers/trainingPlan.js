const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Activity = require("../models/activity");
const TrainingPlan = require("../models/trainingPlan");
const { getMonday, getWeekDates, formatDate } = require("../utils/dateHelper");

router.get("/", async (req, res) => {
  try {
    // 1. Decide which week to show:
    //    - If the URL has ?start=2025-04-14, use that date
    //    - Otherwise default to today
    const startParam = req.query.start; // e.g. "2025-04-14"
    const baseDate = startParam ? new Date(startParam) : new Date();

    //2. Figure out that weeks monday
    const monday = getMonday(baseDate); //find current weeks monday

    // 3. Build an array of date objects [Mon.. Sun] - get the real dates
    const weekDates = getWeekDates(monday);

    //4. Fetch the users training plan for that week
    const user = req.session.user._id;
    //*I need to add activties to the trainingPlan
    const trainingPlan = await TrainingPlan.findOne({
      owner: user,
      weekStart: monday,
    }).populate({
      path: "days.monday days.tuesday days.wednesday days.thursday days.friday days.saturday days.sunday",
      model: "Activity",
    });

    //5. Prepare “Previous” / “Next” links by shifting monday by ±7 days
    const prevMon = new Date(monday);
    prevMon.setDate(monday.getDate() - 7); //go back 7 days
    const nextMon = new Date(monday);
    nextMon.setDate(monday.getDate() + 7); // go forward 7 days

    //6. prepare template
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    //7. create the nav buttons for previous and next week
    const nav = {
      prev: formatDate(prevMon), // e.g. "2025-04-14"
      next: formatDate(nextMon),
    };

    //testing 
    console.log(
      "monday of the week",
      monday,
      "week dates",
      weekDates,
      "training plan",
      trainingPlan
    );
    //7. render to template
    res.render("trainingPlan/index.ejs", {
      daysOfWeek, // ["Monday", …, "Sunday"]
      monday, // Date for this week’s Monday
      weekDates, // [MonDate, TueDate, …, SunDate]
      trainingPlan, // may be null or populated
      nav,
    });
  } catch (e) {
    console.log("Cannot find training plan for user", e);
    res.status(500).send("Cannot find training plan");
  }
});

module.exports = router;
