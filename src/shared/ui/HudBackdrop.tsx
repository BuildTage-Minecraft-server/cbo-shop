const FLOOR_LINES = [14, 44, 82, 130, 190, 262] as const;

type Tick = { x: number; y1: number; y2: number; opacity: number };

function createTicks(): Tick[] {
  let seed = 7;
  const next = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const ticks: Tick[] = [];
  for (let index = 0; index < 34; index += 1) {
    const x = Math.round(next() * 1280);
    const row = Math.floor(next() * (FLOOR_LINES.length - 1));
    const y1 = FLOOR_LINES[row] + 4;
    const y2 = Math.min(FLOOR_LINES[row + 1] - 4, y1 + 20 + Math.round(next() * 40));
    ticks.push({ x, y1, y2, opacity: Number((0.1 + next() * 0.12).toFixed(2)) });
  }
  return ticks;
}

const TICKS = createTicks();

export function HudBackdrop() {
  return (
    <div aria-hidden="true" className="hud-backdrop">
      <svg className="hud-floor" viewBox="0 0 1280 300" preserveAspectRatio="none">
        {FLOOR_LINES.map((y) => (
          <line
            key={y}
            x1="0"
            x2="1280"
            y1={y}
            y2={y}
            stroke="#d77ad0"
            strokeOpacity="0.2"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {TICKS.map((tick) => (
          <line
            key={`${tick.x}-${tick.y1}`}
            x1={tick.x}
            x2={tick.x}
            y1={tick.y1}
            y2={tick.y2}
            stroke="#d77ad0"
            strokeOpacity={tick.opacity}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span className="hud-corner hud-corner--bl" />
      <span className="hud-corner hud-corner--br" />
    </div>
  );
}
