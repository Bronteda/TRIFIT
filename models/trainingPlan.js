const mongoose = require("mongoose");

const User = require("./user");
const Activity = require("./activity");

const traningPlanSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  weekStart: { type: Date, default: Date.now },
  days: {
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    tuesday:[ { type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    wednesday:[ { type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    saturday:[ { type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
    sunday: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activity" }],
  },
});

const TrainingPlan = mongoose.model("TrainingPlan", traningPlanSchema);

module.exports = TrainingPlan;
