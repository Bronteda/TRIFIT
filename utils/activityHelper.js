//import activity model
const Activity = require("../models/activity");

//sort activities in newsest to oldest order
const sortedActivities = (activities) => {
  const activitiesSorted = activities.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return activitiesSorted;
};

//workout the duration in minutes spend on each activity0- Pie chart
const getTotalMinutesSpendOnActivity = async (user) => {
  let totalRunMin = 0;
  let totalCycleMin = 0;
  let totalSwimMin = 0;

  const runActivities = await Activity.find({
    owner: user,
    activity: "Run",
  });
  //console.log("found running activities",runActivities);

  runActivities.forEach((run) => {
    //console.log("total running minutes",totalRunMin);
    totalRunMin = totalRunMin + run.duration;
  });

  const cycleActivities = await Activity.find({
    owner: user,
    activity: "Cycle",
  });

  cycleActivities.forEach((cycle) => {
    totalCycleMin = totalCycleMin + cycle.duration;
  });

  const swimActivities = await Activity.find({
    owner: user,
    activity: "Swim",
  });

  swimActivities.forEach((swim) => {
    totalSwimMin = totalSwimMin + swim.duration;
  });

  //console.log("total run minutes at end",totalRunMin)

  return { totalRunMin, totalCycleMin, totalSwimMin };
};
//create a helper function that will return dates , distance and duration of each activity for certain activity
//line graph

const getInfoLineGraphs = async (activities, type) => {
  let activityDates = [];
  let activityDuration = [];
  let activityDistance = [];
  let activityPaces = [];

  if (type === "swim") {
    activities.forEach((activity) => {
      // console.log("activity complted ",activity.complete , activity )
      if (activity.completed) {
        //checking if activity completed
        activityPaces.push(
          activity.duration / ((activity.distance * 1000) / 100),
        );
        activityDates.push(activity.date.toISOString().slice(0, 10));
        activityDuration.push(activity.duration);
        activityDistance.push(activity.distance);
      }
    });
  } else if (type === "cycle") {
    activities.forEach((activity) => {
      if (activity.completed) {
        activityPaces.push(activity.distance / (activity.duration / 60)); //km/(min/60 ) - km per hour
        activityDates.push(activity.date.toISOString().slice(0, 10));
        activityDuration.push(activity.duration);
        activityDistance.push(activity.distance);
      }
    });
  } else {
    activities.forEach((activity) => {
      if (activity.completed) {
        const pace = activity.duration / activity.distance;
        const minutes = Math.floor(pace);
        const seconds = Math.round((pace - minutes) * 60);
        activityPaces.push(Number(`${minutes}.${seconds}`));
        activityDates.push(activity.date.toISOString().slice(0, 10));
        activityDuration.push(activity.duration);
        activityDistance.push(activity.distance);
      }
    });
  }

  // console.log(
  //   "activityDates",
  //   activityDates,
  //   "activityDuration",
  //   activityDuration,
  //   "activityDistance",
  //   activityDistance,
  //   activityPace
  // );
  //console.log(activityPaces);
  return { activityDates, activityDuration, activityDistance, activityPaces };
};

module.exports = {
  sortedActivities,
  getTotalMinutesSpendOnActivity,
  getInfoLineGraphs,
};
