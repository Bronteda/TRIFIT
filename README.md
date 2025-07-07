<p align="center">
  <img src="/public/images/trifit-logo-full.png" alt="TriFit Logo" width="300"/>
</p>

<h1 align="center">TRIFIT🏃‍♀️🚴‍♂️🏊</h1>

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

## 🧰 Helper Functions

To keep my routes and views clean, I modularized key logic into helper files. This made the app easier to maintain, reuse, and scale.

---

### 📏 `format-duration.js`

Handles all formatting and parsing of time durations.

- `totalMinutesCalculated(hours, minutes)`  
  Converts separate hour and minute inputs into total minutes (used for saving to the database).

- `separateDuration(totalMinutes)`  
  Converts total minutes back into hours + minutes (used in edit forms).

- `formatDuration(totalMinutes)`  
  Converts total minutes into a readable string like `"1 hr 45 min"` or `"15 min"`.

---

### 📅 `dateHelper.js`

Provides week-based calendar date logic.

- `getWeekDates(todayDate)`  
  Calculates the Monday-to-Sunday dates for the week of a given date. Useful for building training plan calendars.

- `getActivitiesOnDate(day, activities)`  
  Filters a list of activities to return only those that match a given day (by ISO date string).

---

### ⏳ `countDownHelper.js`

Used for event countdown and race day logic.

- `countDown(eventDate)`  
  Calculates how many **weeks, days, hours, minutes, and seconds** remain until a target event date.

- `raceDay(eventDate)`  
  Returns `true` if today matches the event date (`YYYY-MM-DD`), `false` otherwise.

---

### 🏃 `activityHelper.js`

Supports chart data and activity sorting.

- `sortedActivities(activities)`  
  Sorts activities by date, from newest to oldest.

- `getTotalMinutesSpendOnActivity(user)`  
  Returns total minutes spent on each activity type (run, swim, cycle). Used for pie chart breakdowns.

- `getInfoLineGraphs(activities, type)`  
  Generates arrays of:
  - Dates
  - Durations
  - Distances
  - Paces  
    Used to build line graphs for a given activity type (`"run"`, `"swim"`, or `"cycle"`).

---

## What I learnt :

### 🔄 Sort and Filter Functions

- Both are forms within EJS:
  - They are a GET form:
    ```html
    <form method="GET" action="/activities"></form>
    ```
  - **How it works:**
    - `method="GET"` tells the browser to send the form values as a query string in the URL.
    - `action="/activities"` tells the form where to send the request.
    - Each `<select name="...">` provides a key-value pair for the query string.

- **When you hit submit:**

---

### 🧭 `toISOString()`

- `toISOString()` takes a `Date` and converts it to a string like:2025-04-14T00:00:00.000Z

- Then we slice it to only keep the first 10 characters:

```js
const date = new Date();
const shortDate = date.toISOString().slice(0, 10); // "2025-04-14"
```

---

### 🧼 Form Validation & Data Sanitization

- I validated user input before saving it to the database:

  ```js
  if (isNaN(duration) || duration < 0) {
    return res.status(400).send("Duration must be a number bigger than 0");
  }

  const distance = parseFloat(req.body.distance);
  if (isNaN(distance) || distance < 0) {
    return res.status(400).send("Distance must be a number bigger than 0");
  }
  ```

---

### Session-Based Authentication

- I used `req.session.user._id` to securely associate activities and training plans with the currently logged-in user.

  ```js
  const user = req.session.user._id;
  This ensures each user can only access and modify their own data.
  ```

```

```
