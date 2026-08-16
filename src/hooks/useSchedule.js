import { useState } from "react";
import { SEED_SCHEDULE } from "../data/seedActivities";

export function useSchedule() {
  const [schedule, setSchedule] = useState(SEED_SCHEDULE);

  function addScheduleItem(day, { type, time }) {
    if (!time.trim()) return;
    setSchedule((prev) => ({
      ...prev,
      [day]: [...prev[day], { id: `s${Date.now()}`, type, time, status: "planned" }],
    }));
  }

  function toggleItemDone(day, itemId) {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((item) =>
        item.id === itemId ? { ...item, status: item.status === "done" ? "planned" : "done" } : item
      ),
    }));
  }

  return { schedule, addScheduleItem, toggleItemDone };
}
