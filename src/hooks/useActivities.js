import { useMemo, useState } from "react";
import { SEED_ACTIVITIES, DAYS } from "../data/seedActivities";

/**
 * Owns the logged-activity list and derives dashboard stats from it.
 * Swap the seed data / setActivities calls for real API calls when a
 * backend is wired up — the returned shape stays the same.
 */
export function useActivities() {
  const [activities, setActivities] = useState(SEED_ACTIVITIES);

  function logActivity({ type, duration, distance, notes }) {
    const today = new Date().toISOString().slice(0, 10);
    setActivities((prev) => [
      {
        id: Date.now(),
        type,
        date: today,
        duration: Number(duration),
        distance: distance ? Number(distance) : null,
        notes,
      },
      ...prev,
    ]);
  }

  const weeklyMinutesByDay = useMemo(() => {
    const totals = Object.fromEntries(DAYS.map((day) => [day, 0]));
    activities.forEach((activity) => {
      const date = new Date(`${activity.date}T00:00:00`);
      const dayIndex = (date.getDay() + 6) % 7; // Monday-first index
      totals[DAYS[dayIndex]] += activity.duration;
    });
    return DAYS.map((day) => ({ day, minutes: totals[day] }));
  }, [activities]);

  const totalMinutes = useMemo(
    () => activities.reduce((sum, activity) => sum + activity.duration, 0),
    [activities]
  );

  return {
    activities,
    logActivity,
    weeklyMinutesByDay,
    totalMinutes,
    sessionCount: activities.length,
  };
}
