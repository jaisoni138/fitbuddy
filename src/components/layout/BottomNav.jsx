import { NAV_ITEMS } from "./navItems";
import styles from "./BottomNav.module.css";

/** Fixed bottom tab bar, shown on phone-width viewports only (see BottomNav.module.css). */
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
