//helper function to format the duration into a readable time on the show page

//convert duration into from string in new form to total minutes
const totalMinutesCalculated = (hours, minutes) => {
  hours = parseInt(hours, 10) || 0;
  minutes = parseInt(minutes, 10) || 0;
  duration = hours * 60 + minutes;
  return duration;
};

//Put the duration back together into total minutes
const separateDuration = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
};

//Help display the duration
const formatDuration = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  //   console.log("hours and minutes", hours, minutes);

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} hrs`;
  }

  //grammer change - learnt about
  return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min`;
};

module.exports = { totalMinutesCalculated, separateDuration, formatDuration };
