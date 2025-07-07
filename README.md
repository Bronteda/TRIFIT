<p align="center">
  <img src="/public/images/trifit-logo-full.png" alt="TriFit Logo" width="300"/>
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

- Sort and Filter functons

- Both are forms within EJS
  - They are a Get form - <form method="GET" action="/activities">
  - How it works :
    - The method="GET" tells the browser to send the form values as a query string in the URL.
    - The action="/activities" tells the form where to send the request
    - Each <select name="..."> provides a key-value pair for the query string.
- When you hit submit - /activities?activity=Cycle&sort=newest

-  toISOString()
toISOString()- takes a Date and makes it a string 
we then slice it to only take first 10 characters 
e.g. 2025-04-14

