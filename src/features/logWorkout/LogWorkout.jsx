import { useState } from "react";
import { ACTIVITY_TYPES, DISTANCE_TRACKED_TYPES } from "../../constants/activityTypes";
import { theme } from "../../constants/theme";
import styles from "./LogWorkout.module.css";

export function LogWorkout({ onSubmit }) {
  const [type, setType] = useState("running");
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!duration || Number(duration) <= 0) {
      setError("Enter a duration in minutes first.");
      return;
    }
    setError("");
    onSubmit({ type, duration, distance, notes });
    setDuration("");
    setDistance("");
    setNotes("");
  }

  return (
    <div>
      <div className={styles.title}>Log a workout</div>

      <div className={styles.typeGrid}>
        {ACTIVITY_TYPES.map((activityType) => {
          const Icon = activityType.icon;
          const isActive = type === activityType.id;
          return (
            <button
              key={activityType.id}
              type="button"
              onClick={() => setType(activityType.id)}
              className={isActive ? `${styles.typeButton} ${styles.typeButtonActive}` : styles.typeButton}
            >
              <Icon size={18} color={isActive ? theme.color.accent : theme.color.textMuted} />
              <span className={isActive ? `${styles.typeLabel} ${styles.typeLabelActive}` : styles.typeLabel}>
                {activityType.label}
              </span>
            </button>
          );
        })}
      </div>

      <label className={styles.fieldLabel}>Duration (minutes)</label>
      <input
        type="number"
        value={duration}
        onChange={(event) => {
          setDuration(event.target.value);
          setError("");
        }}
        placeholder="30"
        className={styles.textInput}
      />
      {error && <div className={styles.errorText}>{error}</div>}

      {DISTANCE_TRACKED_TYPES.has(type) && (
        <>
          <label className={styles.fieldLabel}>Distance (km)</label>
          <input
            type="number"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            placeholder="5.0"
            className={styles.textInput}
          />
        </>
      )}

      <label className={styles.fieldLabel}>Notes</label>
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="How did it feel?"
        rows={3}
        className={styles.textArea}
      />

      <button type="button" onClick={handleSubmit} className={styles.submitButton}>
        Save workout
      </button>
    </div>
  );
}
