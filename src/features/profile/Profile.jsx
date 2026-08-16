import { User, LogIn, ChevronRight } from "lucide-react";
import styles from "./Profile.module.css";

const SETTINGS_ROWS = ["Units: kilometers", "Weekly goal: 150 minutes", "Notifications: on"];

export function Profile({ signedIn, onSignIn, onSignOut }) {
  return (
    <div>
      <div className={styles.title}>Profile</div>

      {signedIn ? (
        <div className={styles.signedInCard}>
          <div className={styles.avatar}>JD</div>
          <div>
            <div className={styles.name}>Jordan Diaz</div>
            <div className={styles.subtext}>Signed in with Google</div>
          </div>
        </div>
      ) : (
        <div className={styles.signedOutCard}>
          <User size={26} color="#c7c3bd" className={styles.signedOutIcon} />
          <div className={styles.signedOutText}>Sign in to sync your account.</div>
          <button type="button" onClick={onSignIn} className={styles.signInButton}>
            <LogIn size={14} /> Sign in with Google
          </button>
        </div>
      )}

      <div className={styles.settingsCard}>
        {SETTINGS_ROWS.map((row) => (
          <div key={row} className={styles.settingsRow}>
            <span className={styles.settingsLabel}>{row}</span>
            <ChevronRight size={15} color="#c7c3bd" />
          </div>
        ))}
      </div>

      {signedIn && (
        <button type="button" onClick={onSignOut} className={styles.signOutButton}>
          Sign out
        </button>
      )}
    </div>
  );
}
