import { TrendingUp, Plus, Calendar, PlayCircle, User } from "lucide-react";
import styles from "./BottomNav.module.css";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "log", label: "Log", icon: Plus },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "videos", label: "Videos", icon: PlayCircle },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav({ activeTab, onChange }) {
  return (
    <nav className={styles.nav}>
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={isActive ? `${styles.navButton} ${styles.navButtonActive}` : styles.navButton}
          >
            <Icon size={19} />
            <span className={styles.navLabel}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
