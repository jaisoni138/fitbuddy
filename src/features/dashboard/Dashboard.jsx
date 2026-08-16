import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Clock, TrendingUp, Flame, Plus } from "lucide-react";
import { StatCard } from "../../components/ui/StatCard";
import { ActivityRow } from "../../components/ui/ActivityRow";
import { theme } from "../../constants/theme";
import styles from "./Dashboard.module.css";

// Placeholder until streak tracking is backed by persisted data.
const CURRENT_STREAK_DAYS = 3;

export function Dashboard({ activities, weeklyMinutesByDay, totalMinutes, sessionCount, onNavigateToLog }) {
  return (
    <div>
      <div className={styles.statsRow}>
        <StatCard icon={Clock} label="This week" value={`${totalMinutes}m`} />
        <StatCard icon={TrendingUp} label="Sessions" value={sessionCount} />
        <StatCard icon={Flame} label="Streak" value={`${CURRENT_STREAK_DAYS}d`} />
      </div>

      <div className={styles.grid}>
        <div className={styles.chartCard}>
          <div className={styles.chartTitle}>Minutes by day</div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMinutesByDay} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.color.borderLight} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: theme.color.textFaint }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: theme.color.textFaint }} axisLine={false} tickLine={false} width={28} />
                <Tooltip cursor={{ fill: theme.color.background }} contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${theme.color.border}` }} />
                <Bar dataKey="minutes" fill={theme.color.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Recent activity</div>
            <button type="button" className={styles.logLink} onClick={onNavigateToLog}>
              Log workout <Plus size={13} />
            </button>
          </div>
          <div className={styles.activityList}>
            {activities.slice(0, 5).map((activity) => (
              <ActivityRow key={activity.id} item={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
