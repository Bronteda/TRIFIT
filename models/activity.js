const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", //A reference to the User model.
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", //A reference to the Event model when saving race activities
  },
  completed: { type: Boolean, default: false },
  date: {
    type: Date,
    required: true,
    default: Date.now, // set default
  },
  activity: {
    type: String,
    required: true,
    enum: ["Swim", "Cycle", "Run", "Race"],
  },
  duration: {
    type: Number,
    min: 0,
  },
  distance: {
    type: Number,
    min: 0,
  },
  intensity: {
    type: String,
    enum: ["Low", "Moderate", "Vigorous"],
  },
  notes: {
    type: String,
    trim: true, // removes leading/trailing spaces
  },
});

//create the model
const Activity = mongoose.model("Activity", activitySchema);

//export model
module.exports = Activity;
