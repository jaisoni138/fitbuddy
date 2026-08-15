import React, { useState, useMemo } from "react";
import {
  Footprints, Compass, Dumbbell, Flower2, Activity as ActivityIcon,
  Calendar, User, Plus, TrendingUp, Clock, Flame, ChevronRight, X,
  Check, PlayCircle, LogIn, ChevronLeft, Search
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const ORANGE = "#ea580c";

const ACTIVITY_TYPES = [
  { id: "running", label: "Running", icon: Footprints },
  { id: "walking", label: "Walking", icon: Compass },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "yoga", label: "Yoga", icon: Flower2 },
  { id: "exercise", label: "Exercise", icon: ActivityIcon },
];

const activityMeta = (id) => ACTIVITY_TYPES.find((a) => a.id === id) || ACTIVITY_TYPES[4];

const SEED_ACTIVITIES = [
  { id: 1, type: "running", date: "2026-08-11", duration: 32, distance: 5.1, notes: "Morning loop, felt strong" },
  { id: 2, type: "yoga", date: "2026-08-12", duration: 25, distance: null, notes: "Hip openers" },
  { id: 3, type: "gym", date: "2026-08-12", duration: 55, distance: null, notes: "Push day" },
  { id: 4, type: "walking", date: "2026-08-13", duration: 40, distance: 3.2, notes: "Lunch walk" },
  { id: 5, type: "exercise", date: "2026-08-14", duration: 20, distance: null, notes: "Core circuit" },
  { id: 6, type: "running", date: "2026-08-15", duration: 28, distance: 4.4, notes: "Interval work" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const SEED_SCHEDULE = {
  Mon: [{ id: "s1", type: "gym", time: "6:30 AM", status: "planned" }],
  Tue: [{ id: "s2", type: "running", time: "7:00 AM", status: "planned" }],
  Wed: [{ id: "s3", type: "yoga", time: "6:00 PM", status: "planned" }],
  Thu: [{ id: "s4", type: "gym", time: "6:30 AM", status: "planned" }],
  Fri: [{ id: "s5", type: "walking", time: "12:30 PM", status: "planned" }],
  Sat: [{ id: "s6", type: "running", time: "8:00 AM", status: "planned" }],
  Sun: [],
};

const VIDEOS = {
  running: [
    { title: "Beginner running form guide", channel: "Nike Run Club" },
    { title: "5k interval workout for speed", channel: "Global Triathlon Network" },
    { title: "How to avoid common running injuries", channel: "Athlean-X" },
  ],
  walking: [
    { title: "30 minute fat-burning walk workout", channel: "Walk at Home" },
    { title: "Power walking technique tips", channel: "Fitness Blender" },
    { title: "Low-impact indoor walking routine", channel: "Walk at Home" },
  ],
  gym: [
    { title: "Full body strength workout, no machines", channel: "Athlean-X" },
    { title: "Beginner barbell squat and deadlift form", channel: "Nike Training Club" },
    { title: "Push pull legs split explained", channel: "Athlean-X" },
  ],
  yoga: [
    { title: "Morning yoga flow for flexibility", channel: "Yoga with Adriene" },
    { title: "Yoga for tight hips and lower back", channel: "Yoga with Adriene" },
    { title: "15 minute wind-down yoga stretch", channel: "MadFit" },
  ],
  exercise: [
    { title: "20 minute full body HIIT, no equipment", channel: "MadFit" },
    { title: "Core strength circuit for beginners", channel: "Fitness Blender" },
    { title: "Mobility routine for desk workers", channel: "Athlean-X" },
  ],
};

function RouteDivider({ color = "var(--border-strong, #d6d3d1)" }) {
  return (
    <svg viewBox="0 0 400 12" preserveAspectRatio="none" style={{ width: "100%", height: 10, display: "block" }}>
      <line x1="0" y1="6" x2="400" y2="6" stroke={color} strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
    </svg>
  );
}

function Pill({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 500,
        border: active ? `1.5px solid ${ORANGE}` : "1px solid #e7e5e4",
        background: active ? "#fff7ed" : "#fff",
        color: active ? "#9a3412" : "#57534e",
        whiteSpace: "nowrap",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: "14px 16px", flex: 1, minWidth: 130 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#78716c", marginBottom: 8 }}>
        <Icon size={15} />
        <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: 0.3, textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, color: "#1c1917", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#a8a29e", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ActivityRow({ item }) {
  const meta = activityMeta(item.type);
  const Icon = meta.icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #f0efec" }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={ORANGE} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#1c1917" }}>{meta.label}</div>
        <div style={{ fontSize: 12, color: "#a8a29e" }}>
          {item.date} · {item.duration} min{item.distance ? ` · ${item.distance} km` : ""}
        </div>
      </div>
      {item.notes && (
        <div style={{ fontSize: 12, color: "#78716c", maxWidth: 140, textAlign: "right" }}>{item.notes}</div>
      )}
    </div>
  );
}

export default function FitnessApp() {
  const [tab, setTab] = useState("dashboard");
  const [signedIn, setSignedIn] = useState(false);
  const [activities, setActivities] = useState(SEED_ACTIVITIES);
  const [schedule, setSchedule] = useState(SEED_SCHEDULE);
  const [videoFilter, setVideoFilter] = useState("running");
  const [logType, setLogType] = useState("running");
  const [logDuration, setLogDuration] = useState("");
  const [logDistance, setLogDistance] = useState("");
  const [logNotes, setLogNotes] = useState("");
  const [logError, setLogError] = useState("");
  const [addDay, setAddDay] = useState(null);
  const [addDayType, setAddDayType] = useState("running");
  const [addDayTime, setAddDayTime] = useState("");

  const weeklyData = useMemo(() => {
    const byDay = {};
    DAYS.forEach((d) => (byDay[d] = 0));
    activities.forEach((a) => {
      const d = new Date(a.date + "T00:00:00");
      const idx = (d.getDay() + 6) % 7;
      byDay[DAYS[idx]] += a.duration;
    });
    return DAYS.map((d) => ({ day: d, minutes: byDay[d] }));
  }, [activities]);

  const totalMinutes = activities.reduce((s, a) => s + a.duration, 0);
  const sessionCount = activities.length;
  const streak = 3;

  function submitLog() {
    if (!logDuration || Number(logDuration) <= 0) {
      setLogError("Enter a duration in minutes first.");
      return;
    }
    setLogError("");
    const today = new Date().toISOString().slice(0, 10);
    setActivities([
      { id: Date.now(), type: logType, date: today, duration: Number(logDuration), distance: logDistance ? Number(logDistance) : null, notes: logNotes },
      ...activities,
    ]);
    setLogDuration("");
    setLogDistance("");
    setLogNotes("");
    setTab("dashboard");
  }

  function addScheduleItem() {
    if (!addDayTime.trim()) return;
    setSchedule((s) => ({
      ...s,
      [addDay]: [...s[addDay], { id: "s" + Date.now(), type: addDayType, time: addDayTime, status: "planned" }],
    }));
    setAddDay(null);
    setAddDayTime("");
  }

  function toggleDone(day, id) {
    setSchedule((s) => ({
      ...s,
      [day]: s[day].map((it) => (it.id === id ? { ...it, status: it.status === "done" ? "planned" : "done" } : it)),
    }));
  }

  return (
    <div style={{ fontFamily: "'Work Sans', system-ui, sans-serif", background: "#fafaf9", minHeight: 600, maxWidth: 440, margin: "0 auto", border: "1px solid #e7e5e4", borderRadius: 20, overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Work+Sans:wght@400;500;600&display=swap');
        input, select { font-family: 'Work Sans', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "18px 20px 0", background: "#1c1917" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 22, color: "#fff", letterSpacing: 0.5 }}>FITBUDDY</div>
            <div style={{ fontSize: 12, color: "#a8a29e" }}>Move. Log. Repeat.</div>
          </div>
          {signedIn ? (
            <button onClick={() => setTab("profile")} style={{ width: 36, height: 36, borderRadius: "50%", background: ORANGE, color: "#fff", border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>JD</button>
          ) : (
            <button onClick={() => setSignedIn(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "none", borderRadius: 999, padding: "7px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer", color: "#1c1917" }}>
              <LogIn size={14} /> Sign in with Google
            </button>
          )}
        </div>
        <div style={{ marginTop: 14 }}>
          <RouteDivider color="#44403c" />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 90px", minHeight: 420 }}>
        {tab === "dashboard" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <StatCard icon={Clock} label="This week" value={`${totalMinutes}m`} />
              <StatCard icon={TrendingUp} label="Sessions" value={sessionCount} />
              <StatCard icon={Flame} label="Streak" value={`${streak}d`} />
            </div>

            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#57534e", marginBottom: 10 }}>Minutes by day</div>
              <div style={{ height: 140 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0efec" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip cursor={{ fill: "#fafaf9" }} contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e7e5e4" }} />
                    <Bar dataKey="minutes" fill={ORANGE} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#57534e" }}>Recent activity</div>
              <button onClick={() => setTab("log")} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: ORANGE, background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                Log workout <Plus size={13} />
              </button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: "0 16px" }}>
              {activities.slice(0, 5).map((a) => <ActivityRow key={a.id} item={a} />)}
            </div>
          </div>
        )}

        {tab === "log" && (
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#1c1917", marginBottom: 14 }}>Log a workout</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {ACTIVITY_TYPES.map((t) => {
                const Icon = t.icon;
                const active = logType === t.id;
                return (
                  <button key={t.id} onClick={() => setLogType(t.id)}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 76, padding: "12px 6px", borderRadius: 12, border: active ? `1.5px solid ${ORANGE}` : "1px solid #e7e5e4", background: active ? "#fff7ed" : "#fff", cursor: "pointer" }}>
                    <Icon size={18} color={active ? ORANGE : "#78716c"} />
                    <span style={{ fontSize: 11, color: active ? "#9a3412" : "#57534e", fontWeight: 500 }}>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <label style={{ fontSize: 12, color: "#78716c", fontWeight: 500 }}>Duration (minutes)</label>
            <input type="number" value={logDuration} onChange={(e) => { setLogDuration(e.target.value); setLogError(""); }} placeholder="30"
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #e7e5e4", marginTop: 4, marginBottom: logError ? 4 : 12, fontSize: 14 }} />
            {logError && <div style={{ fontSize: 12, color: "#dc2626", marginBottom: 12 }}>{logError}</div>}

            {(logType === "running" || logType === "walking") && (
              <>
                <label style={{ fontSize: 12, color: "#78716c", fontWeight: 500 }}>Distance (km)</label>
                <input type="number" value={logDistance} onChange={(e) => setLogDistance(e.target.value)} placeholder="5.0"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #e7e5e4", marginTop: 4, marginBottom: 12, fontSize: 14 }} />
              </>
            )}

            <label style={{ fontSize: 12, color: "#78716c", fontWeight: 500 }}>Notes</label>
            <textarea value={logNotes} onChange={(e) => setLogNotes(e.target.value)} placeholder="How did it feel?" rows={3}
              style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 10, border: "1px solid #e7e5e4", marginTop: 4, marginBottom: 18, fontSize: 14, resize: "none" }} />

            <button onClick={submitLog} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: ORANGE, color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Save workout
            </button>
          </div>
        )}

        {tab === "schedule" && (
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#1c1917", marginBottom: 14 }}>This week</div>
            {DAYS.map((day) => (
              <div key={day} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1c1917" }}>{day}</div>
                  <button onClick={() => { setAddDay(day); setAddDayTime(""); }} style={{ background: "none", border: "none", color: ORANGE, cursor: "pointer", display: "flex", alignItems: "center", fontSize: 12, fontWeight: 500, gap: 3 }}>
                    <Plus size={13} /> add
                  </button>
                </div>
                {schedule[day].length === 0 ? (
                  <div style={{ fontSize: 12, color: "#c7c3bd", padding: "8px 0" }}>Rest day</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {schedule[day].map((it) => {
                      const meta = activityMeta(it.type);
                      const Icon = meta.icon;
                      const done = it.status === "done";
                      return (
                        <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff", border: "1px solid #e7e5e4", borderRadius: 10, padding: "9px 12px" }}>
                          <Icon size={16} color={done ? "#a8a29e" : ORANGE} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: done ? "#a8a29e" : "#1c1917", textDecoration: done ? "line-through" : "none" }}>{meta.label}</div>
                            <div style={{ fontSize: 11, color: "#a8a29e" }}>{it.time}</div>
                          </div>
                          <button onClick={() => toggleDone(day, it.id)} style={{ width: 24, height: 24, borderRadius: "50%", border: done ? "none" : "1.5px solid #d6d3d1", background: done ? ORANGE : "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            {done && <Check size={13} color="#fff" />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {addDay === day && (
                  <div style={{ marginTop: 8, background: "#fafaf9", border: "1px dashed #d6d3d1", borderRadius: 10, padding: 10 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                      <select value={addDayType} onChange={(e) => setAddDayType(e.target.value)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #e7e5e4", fontSize: 12 }}>
                        {ACTIVITY_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                      </select>
                      <input value={addDayTime} onChange={(e) => setAddDayTime(e.target.value)} placeholder="7:00 AM" style={{ flex: 1, padding: "8px", borderRadius: 8, border: "1px solid #e7e5e4", fontSize: 12 }} />
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={addScheduleItem} style={{ flex: 1, padding: "7px", borderRadius: 8, border: "none", background: ORANGE, color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Add</button>
                      <button onClick={() => setAddDay(null)} style={{ flex: 1, padding: "7px", borderRadius: 8, border: "1px solid #e7e5e4", background: "#fff", fontSize: 12, cursor: "pointer" }}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "videos" && (
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#1c1917", marginBottom: 12 }}>Video library</div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 14 }}>
              {ACTIVITY_TYPES.map((t) => (
                <Pill key={t.id} active={videoFilter === t.id} onClick={() => setVideoFilter(t.id)}>{t.label}</Pill>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {VIDEOS[videoFilter].map((v, i) => (
                <a key={i} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(v.title + " " + v.channel)}`} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid #e7e5e4", borderRadius: 12, padding: 12, textDecoration: "none" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fff7ed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <PlayCircle size={20} color={ORANGE} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1c1917" }}>{v.title}</div>
                    <div style={{ fontSize: 12, color: "#a8a29e" }}>{v.channel}</div>
                  </div>
                  <Search size={14} color="#c7c3bd" />
                </a>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "#c7c3bd", marginTop: 10 }}>Opens a YouTube search for the topic and channel shown.</div>
          </div>
        )}

        {tab === "profile" && (
          <div>
            <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 18, color: "#1c1917", marginBottom: 16 }}>Profile</div>
            {signedIn ? (
              <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: 16, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: ORANGE, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>JD</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1c1917" }}>Jordan Diaz</div>
                  <div style={{ fontSize: 12, color: "#a8a29e" }}>Signed in with Google</div>
                </div>
              </div>
            ) : (
              <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: 20, textAlign: "center", marginBottom: 16 }}>
                <User size={26} color="#c7c3bd" style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 13, color: "#78716c", marginBottom: 12 }}>Sign in to sync your account.</div>
                <button onClick={() => setSignedIn(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1c1917", border: "none", borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#fff" }}>
                  <LogIn size={14} /> Sign in with Google
                </button>
              </div>
            )}
            <div style={{ background: "#fff", border: "1px solid #e7e5e4", borderRadius: 14, padding: "4px 16px" }}>
              {["Units: kilometers", "Weekly goal: 150 minutes", "Notifications: on"].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 2 ? "1px solid #f0efec" : "none" }}>
                  <span style={{ fontSize: 13, color: "#44403c" }}>{row}</span>
                  <ChevronRight size={15} color="#c7c3bd" />
                </div>
              ))}
            </div>
            {signedIn && (
              <button onClick={() => setSignedIn(false)} style={{ marginTop: 16, width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #e7e5e4", background: "#fff", fontSize: 13, color: "#78716c", cursor: "pointer" }}>
                Sign out
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, maxWidth: 440, margin: "0 auto", background: "#fff", borderTop: "1px solid #e7e5e4", display: "flex", justifyContent: "space-around", padding: "10px 4px" }}>
        {[
          { id: "dashboard", label: "Dashboard", icon: TrendingUp },
          { id: "log", label: "Log", icon: Plus },
          { id: "schedule", label: "Schedule", icon: Calendar },
          { id: "videos", label: "Videos", icon: PlayCircle },
          { id: "profile", label: "Profile", icon: User },
        ].map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", color: active ? ORANGE : "#a8a29e", padding: "2px 8px" }}>
              <Icon size={19} />
              <span style={{ fontSize: 10, fontWeight: 500 }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
