const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  owner: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User",
  },
  name: { type: String, require: true, unique:true},
  date: { type: Date, required: true, default: Date.now }, // set default
  estimateTime: { type: Number },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;