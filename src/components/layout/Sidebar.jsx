import { NAV_ITEMS } from "./navItems";
import { RouteDivider } from "../ui/RouteDivider";
import styles from "./Sidebar.module.css";

/** Left-hand navigation, shown on tablet/desktop viewports only (see Sidebar.module.css). */
export function Sidebar({ activeTab, onChange, signedIn, onSignIn, onGoHome }) {
  return (
    <aside className={styles.sidebar}>
      <div>
        <button type="button" className={styles.brandButton} onClick={onGoHome}>
          <div className={styles.brand}>FITBUDDY</div>
          <div className={styles.tagline}>Move. Log. Repeat.</div>
        </button>
        <div className={styles.divider}>
          <RouteDivider color="#44403c" />
        </div>
      </div>

      <nav className={styles.navList}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {!signedIn && (
        <button type="button" className={styles.signInButton} onClick={onSignIn}>
          Sign in with Google
        </button>
      )}
    </aside>
  );
}
