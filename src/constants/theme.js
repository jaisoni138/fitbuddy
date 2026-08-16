/**
 * Central design tokens.
 * CSS-consuming components should prefer the CSS variables defined in
 * src/index.css (var(--color-accent) etc). This file exists for the
 * handful of places that need raw JS values, e.g. chart fill colors
 * passed as props to Recharts.
 */
export const theme = {
  color: {
    accent: "#ea580c",
    accentBg: "#fff7ed",
    accentDark: "#9a3412",
    dark: "#1c1917",
    surface: "#ffffff",
    background: "#fafaf9",
    border: "#e7e5e4",
    borderLight: "#f0efec",
    textPrimary: "#1c1917",
    textSecondary: "#57534e",
    textMuted: "#78716c",
    textFaint: "#a8a29e",
    danger: "#dc2626",
  },
  font: {
    display: "'Oswald', sans-serif",
    body: "'Work Sans', system-ui, sans-serif",
  },
};
