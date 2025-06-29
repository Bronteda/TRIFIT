const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", //A reference to the User model.
  },
  completed: { type: Boolean, default: false },
  date: {
    type: Date,
    default: Date.now, // optional: sets default to when it's created
  },
  activity: {
    type: String,
    required: true,
    enum: ["Swim", "Cycle", "Run"],
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
