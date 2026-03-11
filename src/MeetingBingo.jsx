import { useState } from "react";

const ALL_PHRASES = [
  "MCP Server", "High Integrity Commitment", "Startup Speed", "Team Triad",
  "Vibe Coding", "Close the Loop", "Agentic", "Discovery Work",
  "Empowered Teams", "Continuous Discovery", "Move Fast", "Third Party Components",
  "Opportunity Solution Tree", "Feature Factory", "Outcome Over Output", "Greenfield",
  "10x Faster", "AI-First", "I Saw Another Company...", "Autonomous",
  "Alignment", "Circle Back", "Bandwidth", "Low Hanging Fruit",
  "Move the Needle", "Customer Outcomes", "Product Thinking", "Single Source of Truth",
  "Scalable", "Just Use AI", "HIC", "POM",
  "Can't You Just...", "Why Can't We Do This In Days", "Prompt Engineering",
];

const CARD_NAMES = ["Sharon", "Vivian", "Scott", "Karl", "Spare"];

function shuffle(array, seed) {
  const arr = [...array];
  let s = seed;
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function BingoCard({ name, seed, cardIndex, reshuffleKey }) {
  const phrases = shuffle(ALL_PHRASES, seed + reshuffleKey * 9999).slice(0, 24);
  const grid = [...phrases.slice(0, 12), "FREE SPACE", ...phrases.slice(12)];
  const [marked, setMarked] = useState(new Set([12]));
  const restart = () => setMarked(new Set([12]));

  const toggle = (i) => {
    if (i === 12) return;
    setMarked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const colors = [
    { accent: "#c0392b", light: "#fdecea", header: "#fff5f5", border: "#f1c0bb" },
    { accent: "#1a6fb5", light: "#e8f2fb", header: "#f0f7ff", border: "#b3d4f0" },
    { accent: "#2e7d32", light: "#e8f5e9", header: "#f1f8f1", border: "#a5d6a7" },
    { accent: "#e65100", light: "#fff3e0", header: "#fff8f0", border: "#ffcc80" },
    { accent: "#7c3aed", light: "#f3eeff", header: "#f9f5ff", border: "#d4b8f8" },
  ];
  const c = colors[cardIndex % colors.length];

  return (
    <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", border: `1px solid ${c.border}`, fontFamily: "monospace" }}>
      <div style={{ background: c.header, borderRadius: "10px", padding: "10px 14px", marginBottom: "14px", borderBottom: `3px solid ${c.accent}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: c.accent, fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2px" }}>North Star 2026</div>
          <div style={{ color: "#1a1a1a", fontSize: "16px", fontWeight: "bold" }}>MEETING BINGO</div>
        </div>
        <div style={{ background: c.light, border: `1px solid ${c.accent}`, borderRadius: "8px", padding: "5px 10px", color: c.accent, fontSize: "12px", fontWeight: "bold" }}>{name}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "3px", marginBottom: "3px" }}>
        {["B","I","N","G","O"].map(l => (
          <div key={l} style={{ color: c.accent, textAlign: "center", fontWeight: "bold", fontSize: "16px", padding: "3px 0" }}>{l}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "3px" }}>
        {grid.map((phrase, i) => {
          const isMarked = marked.has(i);
          const isFree = i === 12;
          return (
            <div key={i} onClick={() => toggle(i)} style={{
              background: isMarked ? c.light : "#fafafa",
              border: isMarked ? `2px solid ${c.accent}` : `1px solid #e0e0e0`,
              borderRadius: "6px", padding: "5px 3px", minHeight: "52px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: isFree ? "default" : "pointer", transition: "all 0.15s",
            }}>
              <span style={{
                color: isFree ? c.accent : isMarked ? c.accent : "#333",
                fontSize: "7.5px", textAlign: "center", lineHeight: "1.3",
                fontWeight: isMarked || isFree ? "bold" : "normal",
                textTransform: isFree ? "uppercase" : "none",
              }}>
                {isFree ? "⭐ FREE SPACE ⭐" : phrase}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "12px", display: "flex", justifyContent: "center" }}>
        <button onClick={restart} style={{
          background: "#fff", color: "#666", border: "1px solid #ddd",
          borderRadius: "6px", padding: "5px 16px", cursor: "pointer",
          fontSize: "10px", fontFamily: "monospace", letterSpacing: "1px", textTransform: "uppercase"
        }}>↺ Clear Marks</button>
      </div>
    </div>
  );
}

export default function MeetingBingo() {
  const [activeCard, setActiveCard] = useState(0);
  const [reshuffleKey, setReshuffleKey] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0", padding: "24px 16px", fontFamily: "monospace" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ color: "#999", fontSize: "10px", letterSpacing: "4px", textTransform: "uppercase", marginBottom: "6px" }}>Atlanta · March 17–19, 2026</div>
        <h1 style={{ color: "#1a1a1a", fontSize: "24px", fontWeight: "bold", margin: 0, letterSpacing: "2px" }}>MEETING BINGO</h1>
        <div style={{ color: "#888", fontSize: "11px", marginTop: "4px" }}>North Star Edition</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
        {CARD_NAMES.map((name, i) => (
          <button key={i} onClick={() => setActiveCard(i)} style={{
            background: activeCard === i ? "#c0392b" : "#fff",
            color: activeCard === i ? "#fff" : "#555",
            border: activeCard === i ? "1px solid #c0392b" : "1px solid #ddd",
            borderRadius: "8px", padding: "7px 14px", cursor: "pointer",
            fontSize: "11px", fontFamily: "monospace", fontWeight: activeCard === i ? "bold" : "normal",
            transition: "all 0.15s"
          }}>{name}</button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button onClick={() => setReshuffleKey(k => k + 1)} style={{
          background: "#fff", color: "#333", border: "1px solid #ccc",
          borderRadius: "8px", padding: "7px 18px", cursor: "pointer",
          fontSize: "11px", fontFamily: "monospace", letterSpacing: "1px",
          textTransform: "uppercase", boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
        }}>🔀 Shuffle All Cards (New Round)</button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <BingoCard
            key={`${activeCard}-${reshuffleKey}`}
            name={CARD_NAMES[activeCard]}
            seed={activeCard * 31337 + 42}
            cardIndex={activeCard}
            reshuffleKey={reshuffleKey}
          />
        </div>
      </div>
    </div>
  );
}
