# Fitbuddy

A fitness and schedule tracking app covering running, walking, gym, yoga, and general exercise. Built with React + Vite, structured as a small feature-based front-end, and installable as a Progressive Web App (PWA) directly from the browser.

## Features

- **Landing page** — full marketing homepage with hero, feature sections, and install call-to-action, shown before entering the app
- **Dashboard** — weekly minutes chart, streak, and recent activity feed
- **Log workout** — log duration, distance, and notes per activity type
- **Schedule** — plan workouts across the week and mark them done
- **Video library** — filterable video suggestions per activity type
- **Profile** — mocked "Sign in with Google" flow
- **Installable** — add Fitbuddy to your home screen or desktop like a native app, with offline support
- **Responsive** — one codebase that adapts across phone, iPad, and laptop

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint        # check code with ESLint
npm run format      # format code with Prettier
```

## Installing the app from the browser

Fitbuddy is a PWA, so it can be installed like a native app once served over `https://` (or `localhost` during development):

- **Chrome / Edge (desktop):** click the install icon in the address bar, or the menu → "Install Fitbuddy"
- **Chrome (Android):** menu → "Add to Home screen"
- **Safari (iOS):** Share button → "Add to Home Screen"

Once installed, Fitbuddy launches in its own window/icon and caches its assets for offline use.

## Responsive layout

- **Phone (< 768px):** single-column, bottom tab bar navigation, edge-to-edge
- **Tablet / laptop (≥ 768px):** left sidebar navigation replaces the bottom tab bar, content widens into a centered card shell
- **Wide desktop (≥ 900–1180px):** dashboard shows the chart and activity feed side by side, schedule shows the week as columns, and the video library shows a multi-column grid

All breakpoints are plain CSS media queries inside each feature's `.module.css` file — no separate mobile/desktop components to keep in sync.

## Project structure

```
public/
  icons/                 # PWA app icons
  apple-touch-icon.png
src/
  main.jsx               # React entry point, registers the service worker
  App.jsx                # view routing (landing vs. app) + tab routing
  index.css              # design tokens (CSS variables) + global reset
  constants/
    theme.js              # JS-side design tokens (for libs like Recharts)
    activityTypes.js       # activity type definitions shared app-wide
  data/
    seedActivities.js      # placeholder activity + schedule data
    videos.js               # video library content
  hooks/
    useActivities.js        # activity log state + derived stats
    useSchedule.js           # weekly schedule state
  components/
    layout/                 # Header, Sidebar, BottomNav, shared nav items
    ui/                      # StatCard, ActivityRow, Pill, RouteDivider
  features/
    landing/                 # marketing homepage (hero, features, CTA, static app preview)
    dashboard/
    logWorkout/
    schedule/
    videoLibrary/
    profile/
index.html
vite.config.js            # includes vite-plugin-pwa configuration
package.json
```

Each feature folder is self-contained (component + its CSS module). Shared design tokens live in `src/index.css` (`:root` CSS variables) and are mirrored in `src/constants/theme.js` for the few places — like chart colors passed to Recharts — that need raw JS values instead of CSS.

## Data

All data (activities, schedule, sign-in state) currently lives in React state via the hooks in `src/hooks/` and resets on page reload. There is no backend yet.

## Next steps

- Wire up a real backend (e.g. Node/Express + PostgreSQL, or Firebase) to persist activities and schedules
- Replace the mocked "Sign in with Google" button with real OAuth via [Firebase Authentication](https://firebase.google.com/docs/auth/web/google-signin) or a custom OAuth 2.0 flow
- Optionally sync scheduled workouts to Google Calendar
- Add a real video backend (curated links or the YouTube Data API) instead of search-query links

## License

MIT — see [LICENSE](./LICENSE).
