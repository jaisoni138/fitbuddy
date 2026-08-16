import { useState } from "react";
import { Header } from "./components/layout/Header";
import { BottomNav } from "./components/layout/BottomNav";
import { Dashboard } from "./features/dashboard/Dashboard";
import { LogWorkout } from "./features/logWorkout/LogWorkout";
import { Schedule } from "./features/schedule/Schedule";
import { VideoLibrary } from "./features/videoLibrary/VideoLibrary";
import { Profile } from "./features/profile/Profile";
import { useActivities } from "./hooks/useActivities";
import { useSchedule } from "./hooks/useSchedule";
import styles from "./App.module.css";

const TABS = {
  DASHBOARD: "dashboard",
  LOG: "log",
  SCHEDULE: "schedule",
  VIDEOS: "videos",
  PROFILE: "profile",
};

export default function App() {
  const [tab, setTab] = useState(TABS.DASHBOARD);
  const [signedIn, setSignedIn] = useState(false);

  const { activities, logActivity, weeklyMinutesByDay, totalMinutes, sessionCount } = useActivities();
  const { schedule, addScheduleItem, toggleItemDone } = useSchedule();

  function handleLogSubmit(entry) {
    logActivity(entry);
    setTab(TABS.DASHBOARD);
  }

  return (
    <div className={styles.appShell}>
      <Header signedIn={signedIn} onSignIn={() => setSignedIn(true)} onOpenProfile={() => setTab(TABS.PROFILE)} />

      <div className={styles.content}>
        {tab === TABS.DASHBOARD && (
          <Dashboard
            activities={activities}
            weeklyMinutesByDay={weeklyMinutesByDay}
            totalMinutes={totalMinutes}
            sessionCount={sessionCount}
            onNavigateToLog={() => setTab(TABS.LOG)}
          />
        )}
        {tab === TABS.LOG && <LogWorkout onSubmit={handleLogSubmit} />}
        {tab === TABS.SCHEDULE && (
          <Schedule schedule={schedule} onAddItem={addScheduleItem} onToggleItem={toggleItemDone} />
        )}
        {tab === TABS.VIDEOS && <VideoLibrary />}
        {tab === TABS.PROFILE && (
          <Profile signedIn={signedIn} onSignIn={() => setSignedIn(true)} onSignOut={() => setSignedIn(false)} />
        )}
      </div>

      <BottomNav activeTab={tab} onChange={setTab} />
    </div>
  );
}
