import { LogIn } from "lucide-react";
import { RouteDivider } from "../ui/RouteDivider";
import styles from "./Header.module.css";

export function Header({ signedIn, onSignIn, onOpenProfile }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.brand}>FITBUDDY</div>
          <div className={styles.tagline}>Move. Log. Repeat.</div>
        </div>
        {signedIn ? (
          <button type="button" className={styles.avatarButton} onClick={onOpenProfile}>
            JD
          </button>
        ) : (
          <button type="button" className={styles.signInButton} onClick={onSignIn}>
            <LogIn size={14} /> Sign in with Google
          </button>
        )}
      </div>
      <div className={styles.divider}>
        <RouteDivider />
      </div>
    </div>
  );
}
