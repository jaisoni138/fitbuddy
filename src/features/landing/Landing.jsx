import {
  Footprints, Compass, Dumbbell, Flower2, Activity as ActivityIcon,
  Calendar, PlayCircle, LogIn, ArrowRight, Download, Wifi,
} from "lucide-react";
import { RouteDivider } from "../../components/ui/RouteDivider";
import { AppPreview } from "./AppPreview";
import styles from "./Landing.module.css";

const ACTIVITY_CARDS = [
  { icon: Footprints, label: "Running", desc: "Log pace, distance, and how each run felt." },
  { icon: Compass, label: "Walking", desc: "Track casual walks alongside harder efforts." },
  { icon: Dumbbell, label: "Gym", desc: "Log strength sessions, sets, and split days." },
  { icon: Flower2, label: "Yoga", desc: "Track flexibility and recovery practice." },
  { icon: ActivityIcon, label: "Exercise", desc: "Everything else — HIIT, circuits, mobility." },
];

const FEATURE_CARDS = [
  {
    icon: Calendar,
    title: "Plan your week",
    desc: "Schedule workouts across the week and check them off as you go, so training stops being an afterthought.",
  },
  {
    icon: PlayCircle,
    title: "Learn with video",
    desc: "A curated library of instructional videos for every activity type, right where you're already logging workouts.",
  },
  {
    icon: LogIn,
    title: "One-tap sign in",
    desc: "Sign in with your Google account — no new password to remember, no extra setup.",
  },
];

const HIGHLIGHTS = [
  "5 activity types in one place",
  "Works offline once installed",
  "No account required to try it",
];

export function Landing({ onEnterApp }) {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>FITBUDDY</div>
        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#activities" className={styles.navLink}>Activities</a>
          <button type="button" className={styles.navCta} onClick={onEnterApp}>
            Open app
          </button>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.eyebrow}>Fitness &amp; schedule tracker</div>
          <h1 className={styles.headline}>
            Every workout, <span className={styles.accentText}>one habit</span> at a time.
          </h1>
          <p className={styles.subhead}>
            Running, walking, gym, yoga, or general exercise — log it, schedule it, and learn it,
            all in one place. Install it like an app, use it like a website.
          </p>
          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryButton} onClick={onEnterApp}>
              Get started <ArrowRight size={16} />
            </button>
            <a href="#features" className={styles.secondaryButton}>
              See how it works
            </a>
          </div>
          <div className={styles.highlightRow}>
            {HIGHLIGHTS.map((item) => (
              <span key={item} className={styles.highlightItem}>{item}</span>
            ))}
          </div>
        </div>
        <div className={styles.heroPreview}>
          <AppPreview />
        </div>
      </header>

      <div className={styles.dividerRow}>
        <RouteDivider color="#e7e5e4" />
      </div>

      <section id="activities" className={styles.section}>
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>Track what you actually do</h2>
          <p className={styles.sectionSubtitle}>
            One tracker for every kind of movement, instead of switching apps for each activity.
          </p>
        </div>
        <div className={styles.activityGrid}>
          {ACTIVITY_CARDS.map(({ icon: Icon, label, desc }) => (
            <div key={label} className={styles.activityCard}>
              <div className={styles.activityIcon}>
                <Icon size={20} />
              </div>
              <div className={styles.activityLabel}>{label}</div>
              <p className={styles.activityDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className={styles.sectionAlt}>
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionTitle}>Built to keep you consistent</h2>
          <p className={styles.sectionSubtitle}>
            Planning, learning, and logging, without extra apps or extra friction.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURE_CARDS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon size={22} />
              </div>
              <div className={styles.featureTitle}>{title}</div>
              <p className={styles.featureDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.installBanner}>
        <div className={styles.installIcon}>
          <Download size={22} />
        </div>
        <div className={styles.installText}>
          <div className={styles.installTitle}>Install it from your browser</div>
          <p className={styles.installDesc}>
            Add Fitbuddy to your home screen on phone or tablet, or install it as a desktop app on
            your laptop. <Wifi size={13} style={{ verticalAlign: "-2px" }} /> It keeps working offline, too.
          </p>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <h2 className={styles.ctaTitle}>Start your streak today</h2>
        <p className={styles.ctaSubtitle}>No sign-up required to try it out.</p>
        <button type="button" className={styles.primaryButton} onClick={onEnterApp}>
          Open Fitbuddy <ArrowRight size={16} />
        </button>
      </section>

      <footer className={styles.footer}>
        <div>
          <div className={styles.footerBrand}>FITBUDDY</div>
          <div className={styles.footerTagline}>Move. Log. Repeat.</div>
        </div>
        <div className={styles.footerLinks}>
          <a href="https://github.com/jaisoni138/fitbuddy" target="_blank" rel="noreferrer" className={styles.footerLink}>
            GitHub
          </a>
          <span className={styles.footerLink}>MIT Licensed</span>
        </div>
      </footer>
    </div>
  );
}
