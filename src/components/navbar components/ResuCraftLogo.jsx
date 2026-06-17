export default function ResuCraftLogo({ size = 48, color = "#1e293b" }) {


  

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      
      <div
        style={{
          width: size,
          height: size,
          minWidth: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 64 64"
          style={{ width: "100%", height: "100%" }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Oven */}
          <rect x="6" y="24" width="52" height="30" rx="8" fill={color} />
          <rect x="10" y="28" width="44" height="22" rx="6" fill="#0f172a" />

          {/* Oven window */}
          <rect x="16" y="32" width="32" height="14" rx="4" fill="#e5e7eb" opacity="0.9" />

          {/* Resume */}
          <rect x="22" y="6" width="20" height="28" rx="3" fill="white" />
          <path d="M42 6 L42 14 L34 6 Z" fill="#e5e7eb" />

          {/* B */}
          <path
            d="M28 14h5c3 0 4 1.5 4 3.5S36 21 33 21h-5v-7zm0 7h6c3 0 4 1.5 4 3.5S37 28 34 28h-6v-7z"
            fill={color}
          />

          {/* Heat */}
          <rect x="20" y="50" width="24" height="3" rx="2" fill="#fb7185" />
        </svg>
      </div>

      <span
        style={{
          fontWeight: 700,
          fontSize: size * 0.55,
          letterSpacing: "0.4px",
          color,
          userSelect: "none",
        }}
      >
        Resu<span style={{ color: "#6366f1" }}>Craft</span>
      </span>
    </div>
  );
}