<p align="center">
  <img src="https://your-logo-url-here.com/trifit-logo.png" alt="TriFit Logo" width="300"/>
</p>

<h1 align="center">TriFit 🏃‍♀️🚴‍♂️🏊</h1>

<p align="center">
  Your ultimate training companion for tracking triathlon progress, weekly plans, and upcoming events — all in one app.
</p>

---

## 📋 Overview

TriFit is a full-stack web application designed to help triathletes and fitness enthusiasts:

- Log and manage activities (Swim, Cycle, Run)
- Create structured weekly training plans
- Track upcoming races and events
- Monitor performance and completion stats

Built with a clean Bulma UI, this app keeps your training journey simple and motivating.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bulma CSS
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** Express-session
- **Templating:** EJS partials and layout reuse
- **Utilities:** Custom helper functions for time formatting and validation

---

## ✨ Features

- 🏃 Activity Tracking (distance, duration, intensity, notes)
- 📅 Weekly Training Plan (auto-structured by weekdays)
- 📌 Race/Event Countdown with time estimation
- ✅ Activity completion status toggle
- 📊 Planned dashboard enhancements: charts, graphs, progress tracking

---

## What I learnt :

### Sort and Filter functons

- Both are forms within EJS
  - They are a Get form - <form method="GET" action="/activities">
  - How it works :
    - The method="GET" tells the browser to send the form values as a query string in the URL.
    - The action="/activities" tells the form where to send the request
    - Each <select name="..."> provides a key-value pair for the query string.
- When you hit submit - /activities?activity=Cycle&sort=newest

### Adding a property to an Object dynamically 

const activityQuery = req.query.activity || "all";
const filter = {};

if (activityQuery !== "all") {
  filter.activity = activityQuery;
}
If the query string is ?activity=Cycle, then:
- activityQuery === 'Cycle'
- Since 'Cycle' !== 'all', we enter the if block.
- filter.activity = 'Cycle';

Now filter becomes: { activity: 'Cycle' }

### Build the “real” dates for each column of your calendar so you can display, say, “Mon Apr 14,” “Tue Apr 15,” … “Sun Apr 20” instead of just the names Monday–Sunday. 

const weekDates = Array.from({ length: 7 }, (_, i) => {
  // 1. Make a fresh Date object that starts out equal to Monday:
  const d = new Date(monday);

  // 2. Shift that date forward by i days:
  //    • when i=0, d stays at Monday
  //    • when i=1, d moves to Tuesday
  //    • …
  //    • when i=6, d moves to Sunday
  d.setDate(monday.getDate() + i);

  // 3. Return the new Date for this slot in the week
  return d;
});

Creates an array of length 7.
For each index i from 0 to 6, it clones the Monday date and adds i days.
You end up with a weekDates array like:[ Mon Apr 14 2025,  Tue Apr 15 2025, …, Sun Apr 20 2025 ]


### toISOString()
toISOString()- takes a Date and makes it a string 
we then slice it to only take first 10 characters 
e.g. 2025-04-14
