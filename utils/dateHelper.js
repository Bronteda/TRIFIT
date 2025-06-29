//to help get the start of the week which is a monday
const getMonday = (dateInput) => {
  const date = new Date(dateInput); // returns a string representing current date
  const day = date.getDay(); //gets day of the week using local time (0-sunday 6-saturday)
  const diff = (day + 6) % 7; //how many days have passed since monday

  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

const getWeekDates = (monday) => {
  return Array.from(
    { length: 7 }, // ← creates an array with indexes 0,1,2,3,4,5,6
    (_, i) => {
      // ← map function called for each index:
      //    • first argument is the “current element” (unused here)
      //    • second argument is the index i (0 through 6)
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    }
  );
};

const formatDate = (date) => {
  // 1) Get the full year (e.g. 2025)
  const year = date.getFullYear();
  // 2) Get the month number (0 for January up to 11 for December),
  //    so we add 1 to make it 1–12. Then we turn it into a string,
  //    and “pad” it so it’s always two characters (e.g. "04" instead of "4").
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // 3) Get the day of the month (1–31), turn it into a string,
  //    and again pad it to two characters (e.g. "09" instead of "9").
  const day = String(date.getDate()).padStart(2, "0");
  // 4) Stick them together with hyphens in between:
  //    "2025" + "-" + "04" + "-" + "21"  →  "2025-04-21"
  return `${year}-${month}-${day}`;
};

module.exports = { getMonday, getWeekDates, formatDate };
