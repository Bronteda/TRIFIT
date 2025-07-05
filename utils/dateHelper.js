//to help get the start of the week which is a monday
const getWeekDates = (todayDate) => {
  const today = new Date(todayDate);
  const currentDay = today.getDay();
 //console.log("Current day", today, "current day", currentDay);

  //Get start of week Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((currentDay + 6) % 7)); //todays actual number - days since monday
  //monday.setHours(2, 0, 0, 0);
  //console.log("Monday", monday);

  //Get all the days of the week
  //tuesday
  const tuesday = new Date(monday);
  tuesday.setDate(tuesday.getDate() + 1);
 //console.log(tuesday);

  //wednesday
  const wednesday = new Date(tuesday);
  wednesday.setDate(tuesday.getDate() + 1);
  //console.log(wednesday);

  //thursday
  const thursday = new Date(wednesday);
  thursday.setDate(wednesday.getDate() + 1);
  //console.log(thursday);

  //friday
  const friday = new Date(thursday);
  friday.setDate(thursday.getDate() + 1);
  //console.log(friday);

  //saturday
  const saturday = new Date(friday);
  saturday.setDate(friday.getDate() + 1);
  //console.log(saturday);

  //Get end of the week - sunday
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + ((7 - currentDay) % 7)); //how many days from today until the next Sunday.
  //console.log("sunday", sunday);

  return { monday, tuesday, wednesday, thursday, friday, saturday, sunday };
};

const getActivitiesOnDate = (day, activitiesSorted) => {
  const dayActivities = activitiesSorted.filter((activity) => {
    return (
      activity.date.toISOString().slice(0, 10) ===
      day.toISOString().slice(0, 10)
    );
  });

  return dayActivities;
};

module.exports = {getWeekDates , getActivitiesOnDate};
