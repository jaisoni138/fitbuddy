import { Footprints, Dumbbell, Flower2 } from "lucide-react";
import styles from "./AppPreview.module.css";

const BARS = [40, 65, 30, 80, 45, 90, 20];
const ROWS = [
  { icon: Footprints, label: "Running", meta: "32 min · 5.1 km" },
  { icon: Flower2, label: "Yoga", meta: "25 min" },
  { icon: Dumbbell, label: "Gym", meta: "55 min" },
];

/**
 * A purely decorative, static stand-in for the real Dashboard screen,
 * used in the landing page hero. Deliberately not the live component
 * so the marketing page never depends on app state or chart rendering.
 */
export function AppPreview() {
  return (
    <div className={styles.frame}>
      <div className={styles.frameBar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.screen}>
        <div className={styles.statRow}>
          <div className={styles.statPill}>
            <div className={styles.statValue}>187m</div>
            <div className={styles.statLabel}>This week</div>
          </div>
          <div className={styles.statPill}>
            <div className={styles.statValue}>6</div>
            <div className={styles.statLabel}>Sessions</div>
          </div>
          <div className={styles.statPill}>
            <div className={styles.statValue}>3d</div>
            <div className={styles.statLabel}>Streak</div>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartBars}>
            {BARS.map((height, i) => (
              <div key={i} className={styles.bar} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div className={styles.list}>
          {ROWS.map(({ icon: Icon, label, meta }) => (
            <div key={label} className={styles.row}>
              <div className={styles.rowIcon}>
                <Icon size={15} />
              </div>
              <div>
                <div className={styles.rowLabel}>{label}</div>
                <div className={styles.rowMeta}>{meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
