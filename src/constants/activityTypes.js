import { Footprints, Compass, Dumbbell, Flower2, Activity as ActivityIcon } from "lucide-react";

export const ACTIVITY_TYPES = [
  { id: "running", label: "Running", icon: Footprints },
  { id: "walking", label: "Walking", icon: Compass },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "yoga", label: "Yoga", icon: Flower2 },
  { id: "exercise", label: "Exercise", icon: ActivityIcon },
];

/** Types that track distance in addition to duration. */
export const DISTANCE_TRACKED_TYPES = new Set(["running", "walking"]);

export function getActivityMeta(typeId) {
  return ACTIVITY_TYPES.find((type) => type.id === typeId) ?? ACTIVITY_TYPES[4];
}
