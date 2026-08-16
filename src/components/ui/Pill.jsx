import styles from "./ui.module.css";

export function Pill({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={active ? `${styles.pill} ${styles.pillActive}` : styles.pill}
    >
      {children}
    </button>
  );
}
