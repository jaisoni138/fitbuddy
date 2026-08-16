import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { ACTIVITY_TYPES, getActivityMeta } from "../../constants/activityTypes";
import { DAYS } from "../../data/seedActivities";
import { theme } from "../../constants/theme";
import styles from "./Schedule.module.css";

export function Schedule({ schedule, onAddItem, onToggleItem }) {
  const [addDay, setAddDay] = useState(null);
  const [addType, setAddType] = useState("running");
  const [addTime, setAddTime] = useState("");

  function handleAdd() {
    if (!addTime.trim()) return;
    onAddItem(addDay, { type: addType, time: addTime });
    setAddDay(null);
    setAddTime("");
  }

  return (
    <div>
      <div className={styles.title}>This week</div>
      {DAYS.map((day) => (
        <div key={day} className={styles.dayBlock}>
          <div className={styles.dayHeader}>
            <div className={styles.dayName}>{day}</div>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => {
                setAddDay(day);
                setAddTime("");
              }}
            >
              <Plus size={13} /> add
            </button>
          </div>

          {schedule[day].length === 0 ? (
            <div className={styles.restDay}>Rest day</div>
          ) : (
            <div className={styles.itemList}>
              {schedule[day].map((item) => {
                const meta = getActivityMeta(item.type);
                const Icon = meta.icon;
                const done = item.status === "done";
                return (
                  <div key={item.id} className={styles.item}>
                    <Icon size={16} color={done ? theme.color.textFaint : theme.color.accent} />
                    <div style={{ flex: 1 }}>
                      <div className={done ? `${styles.itemLabel} ${styles.itemLabelDone}` : styles.itemLabel}>
                        {meta.label}
                      </div>
                      <div className={styles.itemTime}>{item.time}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleItem(day, item.id)}
                      className={done ? `${styles.checkButton} ${styles.checkButtonDone}` : styles.checkButton}
                    >
                      {done && <Check size={13} color="#fff" />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {addDay === day && (
            <div className={styles.addForm}>
              <div className={styles.addFormRow}>
                <select value={addType} onChange={(event) => setAddType(event.target.value)} className={styles.addFormSelect}>
                  {ACTIVITY_TYPES.map((activityType) => (
                    <option key={activityType.id} value={activityType.id}>
                      {activityType.label}
                    </option>
                  ))}
                </select>
                <input
                  value={addTime}
                  onChange={(event) => setAddTime(event.target.value)}
                  placeholder="7:00 AM"
                  className={styles.addFormInput}
                />
              </div>
              <div className={styles.addFormActions}>
                <button type="button" onClick={handleAdd} className={styles.addConfirm}>
                  Add
                </button>
                <button type="button" onClick={() => setAddDay(null)} className={styles.addCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
