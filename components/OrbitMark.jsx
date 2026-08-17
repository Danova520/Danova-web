export function OrbitMark({ className = "", animated = false }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <circle
        className={animated ? "orbit-ring" : ""}
        cx="20"
        cy="20"
        r="15"
        stroke="#C6A15B"
        strokeWidth="1.1"
        strokeDasharray="2 5"
      />
      <circle
        className={animated ? "orbit-dot" : ""}
        cx="20"
        cy="5"
        r="2.6"
        fill="#C6A15B"
      />
    </svg>
  );
}
