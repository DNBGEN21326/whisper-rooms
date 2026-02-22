import { adjectives } from "@/data/adjectives";
import { animals } from "@/data/animals";

const identityColors = [
  "#7C3AED", "#06B6D4", "#EC4899", "#10B981", "#F59E0B",
  "#8B5CF6", "#14B8A6", "#F43F5E", "#22C55E", "#EAB308",
  "#A855F7", "#0EA5E9", "#E879F9", "#34D399", "#FB923C",
];

export function generateIdentity(seed?: number) {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const color = identityColors[Math.floor(Math.random() * identityColors.length)];
  const avatarSeed = seed ?? Math.floor(Math.random() * 1000);

  return {
    name: `${adj} ${animal}`,
    color,
    avatarSeed,
  };
}

export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
