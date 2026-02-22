interface AnonymousAvatarProps {
  seed: number;
  color: string;
  size?: number;
}

export function AnonymousAvatar({ seed, color, size = 32 }: AnonymousAvatarProps) {
  // Generate deterministic geometric pattern from seed
  const shapes = [];
  const rng = (s: number) => {
    s = Math.sin(s * 127.1) * 43758.5453;
    return s - Math.floor(s);
  };

  for (let i = 0; i < 5; i++) {
    const x = rng(seed + i * 13) * size * 0.6 + size * 0.2;
    const y = rng(seed + i * 17) * size * 0.6 + size * 0.2;
    const r = rng(seed + i * 23) * size * 0.15 + size * 0.05;
    const opacity = rng(seed + i * 31) * 0.5 + 0.3;
    shapes.push({ x, y, r, opacity });
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-full flex-shrink-0" style={{ background: `${color}20` }}>
      {shapes.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={color}
          opacity={s.opacity}
        />
      ))}
      <circle cx={size / 2} cy={size / 2} r={size * 0.12} fill={color} opacity={0.9} />
    </svg>
  );
}
