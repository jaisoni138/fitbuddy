import styles from "./ui.module.css";

export function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statCardLabel}>
        <Icon size={15} />
        <span>{label}</span>
      </div>
      <div className={styles.statCardValue}>{value}</div>
      {sub && <div className={styles.statCardSub}>{sub}</div>}
    </div>
  );
}
