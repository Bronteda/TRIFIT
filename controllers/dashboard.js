const express = require("express");
const router = express.Router();

//import our models
const Activity = require("../models/activity");
const User = require("../models/user");
const Event = require("../models/event");

//import our utils - helper functions
const {
  totalMinutesCalculated,
  separateDuration,
} = require("../utils/format-duration");
const { countDown, raceDay } = require("../utils/countDownHelper");
const {
  getTotalMinutesSpendOnActivity,
  getInfoLineGraphs,
} = require("../utils/activityHelper");

router.get("/", async (req, res) => {
  try {
    const user = req.session.user;
    let userEvents = await Event.find({ owner: req.session.user._id });
    userEvents = userEvents.length > 0 ? userEvents : null;

    //this makes the function avaliable to ejs templates
    res.locals.countDown = countDown;
    res.locals.raceDay = raceDay;

    //get total duration of each sport
    //get total minutes is an async functon you needd to await
    const { totalRunMin, totalCycleMin, totalSwimMin } =
      await getTotalMinutesSpendOnActivity(user);
    // console.log("total run time", totalRunMin,);

    //Pie chart
    const yValuesPie = [totalRunMin, totalCycleMin, totalSwimMin];
    const barColors = ["#48c774", "#00d1b2", "#ffdd57"];

    //Line Graphs dataset
    runActivities = await Activity.find({
      owner: user,
      activity: "Run",
    });

    const cycleActivities = await Activity.find({
      owner: user,
      activity: "Cycle",
    });

    const swimActivities = await Activity.find({
      owner: user,
      activity: "Swim",
    });

    const {
      activityDates: runDates,
      activityDuration: runDurations,
      activityDistance: runDistances,
      activityPaces: runPaces,
    } = await getInfoLineGraphs(runActivities, "run");
    const {
      activityDates: cycleDates,
      activityDuration: cycleDurations,
      activityDistance: cycleDistances,
      activityPaces: cyclePaces,
    } = await getInfoLineGraphs(cycleActivities, "cycle");
    const {
      activityDates: swimDates,
      activityDuration: swimDurations,
      activityDistance: swimDistances,
      activityPaces: swimPaces,
    } = await getInfoLineGraphs(swimActivities, "swim");

    //console.log(runDates, runDurations, runDistances, "paces",runPaces);
    res.render("dashboard/index.ejs", {
      userEvents,
      yValuesPie,
      barColors,
      runDates,
      runDurations,
      runDistances,
      runPaces,
      cycleDates,
      cycleDurations,
      cycleDistances,
      cyclePaces,
      swimDates,
      swimDurations,
      swimDistances,
      swimPaces,
    });
  } catch (e) {
    console.log("Couldn't render the dashboard", e);
    res.status(500).send("Couldn't render dashboard");
  }
});

//Add an event GET route
router.get("/event/new", (req, res) => {
  //Gets todays date so we can set a minimum value for date selector
  const today = new Date().toISOString().split("T")[0];
  res.render("dashboard/events/new.ejs", {today});
});

//Add new event to mongodb POST
router.post("/event", async (req, res) => {
  try {
    //console.log(req.body);
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const estimateDuration = totalMinutesCalculated(hours, minutes);

    if (isNaN(estimateDuration) || estimateDuration < 0) {
      //handle invalid input
      return res.status(400).send("Duration must be a number bigger than 0");
    }

    const newEvent = new Event({
      owner: req.session.user._id,
      name: req.body.name,
      date: req.body.date || new Date(), // default to today if not set
      estimateTime: estimateDuration,
    });

    await newEvent.save();

    //add event to training calendar
    const newRaceDayActivity = new Activity({
      owner: req.session.user._id,
      event: newEvent._id,
      date: req.body.date || new Date(), // default to today if not set
      activity: "Race",
    });

    await newRaceDayActivity.save();

    res.redirect("/dashboard");
  } catch (e) {
    console.error("Cannot add event to mongoDB", e);
    res.status(500).send("couldn't add event to db");
  }
});

//Edit Event - GET
router.get("/event/:eventId", async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  //console.log(event.estimateTime);
  //Separate hours and minutes - use helper funtion
  const { hours, minutes } = separateDuration(event.estimateTime);

  res.render("dashboard/events/edit.ejs", { event, hours, minutes });
});

//PUT edit event
router.put("/event/:eventId", async (req, res) => {
  try {
    const currentEvent = await Event.findById(req.params.eventId);
    //console.log(req.body);
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const estimateDuration = totalMinutesCalculated(hours, minutes);

    if (isNaN(estimateDuration) || estimateDuration < 0) {
      //handle invalid input
      return res.status(400).send("Duration must be a number bigger than 0");
    }

    currentEvent.set({
      owner: req.session.user._id,
      name: req.body.name,
      date: req.body.date || new Date(), // default to today if not set
      estimateTime: estimateDuration,
    });

    await currentEvent.save();
    res.redirect("/dashboard");
  } catch (e) {
    console.log("Couldn't Update the event", e);
    res.status(500).send("Couldn't Update event");
  }
});

//Delete event
router.delete("/event/:eventId", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId);
    res.redirect("/dashboard");
  } catch (e) {
    console.log("cannot delete event");
    res.status(500).send("Couldn't delete event");
  }
});

module.exports = router;
