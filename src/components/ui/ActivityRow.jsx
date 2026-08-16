import { getActivityMeta } from "../../constants/activityTypes";
import { theme } from "../../constants/theme";
import styles from "./ui.module.css";

export function ActivityRow({ item }) {
  const meta = getActivityMeta(item.type);
  const Icon = meta.icon;

  return (
    <div className={styles.activityRow}>
      <div className={styles.activityIcon}>
        <Icon size={18} color={theme.color.accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className={styles.activityLabel}>{meta.label}</div>
        <div className={styles.activityMeta}>
          {item.date} · {item.duration} min{item.distance ? ` · ${item.distance} km` : ""}
        </div>
      </div>
      {item.notes && <div className={styles.activityNotes}>{item.notes}</div>}
    </div>
  );
}
