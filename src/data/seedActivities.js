export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const SEED_ACTIVITIES = [
  { id: 1, type: "running", date: "2026-08-11", duration: 32, distance: 5.1, notes: "Morning loop, felt strong" },
  { id: 2, type: "yoga", date: "2026-08-12", duration: 25, distance: null, notes: "Hip openers" },
  { id: 3, type: "gym", date: "2026-08-12", duration: 55, distance: null, notes: "Push day" },
  { id: 4, type: "walking", date: "2026-08-13", duration: 40, distance: 3.2, notes: "Lunch walk" },
  { id: 5, type: "exercise", date: "2026-08-14", duration: 20, distance: null, notes: "Core circuit" },
  { id: 6, type: "running", date: "2026-08-15", duration: 28, distance: 4.4, notes: "Interval work" },
];

export const SEED_SCHEDULE = {
  Mon: [{ id: "s1", type: "gym", time: "6:30 AM", status: "planned" }],
  Tue: [{ id: "s2", type: "running", time: "7:00 AM", status: "planned" }],
  Wed: [{ id: "s3", type: "yoga", time: "6:00 PM", status: "planned" }],
  Thu: [{ id: "s4", type: "gym", time: "6:30 AM", status: "planned" }],
  Fri: [{ id: "s5", type: "walking", time: "12:30 PM", status: "planned" }],
  Sat: [{ id: "s6", type: "running", time: "8:00 AM", status: "planned" }],
  Sun: [],
};
