const countDown = (eventDate) => {
  const today = new Date();
  const difference = new Date(eventDate) - today;

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let weeks = 0;

  if (difference > 0) {
    weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
    days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24),
    );
    hours = Math.floor(
      ((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) % 24,
    );
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }
  //console.log(weeks, days, hours, minutes, seconds);
  return { weeks, days, hours, minutes, seconds };
};

const raceDay = (eventDate) => {
  const today = new Date();
  if (
    eventDate.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = { countDown, raceDay };
