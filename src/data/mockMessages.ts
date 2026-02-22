import { ChatMessage, Participant } from "@/hooks/useChat";

export const mockParticipants: Participant[] = [
  { id: "p1", name: "Cryptic Falcon", color: "#7C3AED", avatarSeed: 1, isOnline: true },
  { id: "p2", name: "Silent Phantom", color: "#06B6D4", avatarSeed: 2, isOnline: true },
  { id: "p3", name: "Neon Serpent", color: "#EC4899", avatarSeed: 3, isOnline: true },
  { id: "p4", name: "Velvet Fox", color: "#10B981", avatarSeed: 4, isOnline: false },
  { id: "p5", name: "Midnight Wolf", color: "#F59E0B", avatarSeed: 5, isOnline: true },
];

export const mockMessages: ChatMessage[] = [
  { id: "m1", participantId: "system", text: "🎭 Cryptic Falcon has entered the room", timestamp: Date.now() - 300000, type: "system" },
  { id: "m2", participantId: "p2", text: "Does anyone else feel like the internet peaked in 2012?", timestamp: Date.now() - 280000, type: "message" },
  { id: "m3", participantId: "p3", text: "Honestly, the old web was chaotic but beautiful. Now everything looks the same.", timestamp: Date.now() - 250000, type: "message" },
  { id: "m4", participantId: "system", text: "🎭 Neon Serpent has entered the room", timestamp: Date.now() - 240000, type: "system" },
  { id: "m5", participantId: "p1", text: "There's something poetic about a conversation that's going to vanish forever.", timestamp: Date.now() - 200000, type: "message" },
  { id: "m6", participantId: "p5", text: "That's the beauty of it. No screenshots, no receipts. Just words in the void.", timestamp: Date.now() - 170000, type: "message" },
  { id: "m7", participantId: "p3", text: "Makes you more honest, doesn't it? When nothing is permanent.", timestamp: Date.now() - 140000, type: "message" },
  { id: "m8", participantId: "p2", text: "Exactly. I'd never say half of this on my main account 😅", timestamp: Date.now() - 100000, type: "message" },
];

export const simulatedIncomingMessages = [
  "What's the most underrated city you've ever visited?",
  "I think we underestimate how much music shapes our personality.",
  "Hot take: pineapple on pizza is actually peak cuisine.",
  "Anyone here a night owl or is it just me?",
  "The concept of time zones still blows my mind honestly.",
  "I've been thinking about quitting social media for a month. Has anyone tried that?",
  "Rain sounds > any lo-fi playlist, fight me.",
  "What's one thing you wish you could tell your younger self?",
];

export const roomNames = [
  "Midnight Fog", "Silent Echo", "Neon Drift", "Shadow Pulse",
  "Lunar Whisper", "Ember Tide", "Crystal Void", "Phantom Signal",
  "Velvet Static", "Dark Current", "Spectral Lounge", "Aurora Depths",
];

export const roomVibes = ["Deep Talk", "Confessions", "Random", "Debate", "Just Vibes", "Late Night", "Philosophy", "Music"];
