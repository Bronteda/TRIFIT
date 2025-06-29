# TRIFIT

What I learnt :

Sort and Filter functons

- Both are forms within EJS
  - They are a Get form - <form method="GET" action="/activities">
  - How it works :
    - The method="GET" tells the browser to send the form values as a query string in the URL.
    - The action="/activities" tells the form where to send the request
    - Each <select name="..."> provides a key-value pair for the query string.
- When you hit submit - /activities?activity=Cycle&sort=newest

Adding a property to an Object dynamically 

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

Build the “real” dates for each column of your calendar so you can display, say, “Mon Apr 14,” “Tue Apr 15,” … “Sun Apr 20” instead of just the names Monday–Sunday. 

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

* nav in the training plan section
nav: {
  prev: prev.toISOString().slice(0,10),  // "YYYY-MM-DD"
  next: next.toISOString().slice(0,10),
}

toISOString()- takes a Date and makes it a string 
we then slice it to only take first 10 characters 
e.g. 2025-04-14

We use this in our template to go to the previous week and the future week e.g. <a href="?start=<%= nav.prev %>">← Previous Week</a>
and because nav.prev is "2025-04-14", clicking it loads /trainingPlan?start=2025-04-07 (i.e. one week earlier).
Which then calls the index page again but with a req.query attached:
 // 1. Decide which week to show:
    //    - If the URL has ?start=2025-04-14, use that date
    //    - Otherwise default to today
    const startParam = req.query.start; // e.g. "2025-04-14"
    const baseDate = startParam ? new Date(startParam) : new Date();