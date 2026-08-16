export function RouteDivider({ color = "#44403c" }) {
  return (
    <svg viewBox="0 0 400 12" preserveAspectRatio="none" style={{ width: "100%", height: 10, display: "block" }}>
      <line x1="0" y1="6" x2="400" y2="6" stroke={color} strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
    </svg>
  );
}
