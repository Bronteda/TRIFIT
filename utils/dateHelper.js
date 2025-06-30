//to help get the start of the week which is a monday
const getWeekDates = (todayDate) => {
  const today = todayDate;
  const currentDay = today.getDay();
  console.log("Current day", today, "current day", currentDay);

  //Get start of week Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() + ((currentDay + 6) % 7));
  monday.setHours(2, 0, 0, 0);
  console.log("Monday", monday);

  //Get end of the week
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + ((7 - currentDay) % 7));
  sunday.setHours(23,59,59,999);
  console.log("sunday", sunday);

  return {monday, sunday};
};

module.exports = getWeekDates;
