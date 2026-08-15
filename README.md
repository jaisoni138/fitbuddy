# Trailhead

A fitness and schedule tracking app prototype covering running, walking, gym, yoga, and general exercise. Built with React + Vite.

## Features

- **Dashboard** — weekly minutes chart, streak, and recent activity feed
- **Log workout** — log duration, distance, and notes per activity type
- **Schedule** — plan workouts across the week and mark them done
- **Video library** — filterable video suggestions per activity type
- **Profile** — mocked "Sign in with Google" flow

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx       # main app component (all screens + state)
  main.jsx      # React entry point
  index.css     # base styles
index.html
package.json
vite.config.js
```

## Data

All data (activities, schedule, sign-in state) currently lives in React state and resets on page reload. There is no backend yet.

## Next steps

- Wire up a real backend (e.g. Node/Express + PostgreSQL, or Firebase) to persist activities and schedules
- Replace the mocked "Sign in with Google" button with real OAuth via [Firebase Authentication](https://firebase.google.com/docs/auth/web/google-signin) or a custom OAuth 2.0 flow
- Optionally sync scheduled workouts to Google Calendar
- Add a real video backend (curated links or a YouTube Data API search) instead of search-query links
