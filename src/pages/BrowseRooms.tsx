import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Ghost, ArrowLeft, Clock, Users, Sparkles } from "lucide-react";
import { BackgroundParticles } from "@/components/shared/BackgroundParticles";
import { roomNames, roomVibes } from "@/data/mockMessages";
import { generateRoomCode } from "@/utils/identityGenerator";

interface MockRoom {
  code: string;
  name: string;
  vibes: string[];
  participants: number;
  maxParticipants: number;
  remainingMs: number;
}

const generateMockRooms = (): MockRoom[] =>
  Array.from({ length: 8 }, (_, i) => ({
    code: generateRoomCode(),
    name: roomNames[i % roomNames.length],
    vibes: [roomVibes[Math.floor(Math.random() * roomVibes.length)]],
    participants: Math.floor(Math.random() * 18) + 2,
    maxParticipants: 20,
    remainingMs: Math.floor(Math.random() * 55 * 60 * 1000) + 5 * 60 * 1000,
  }));

export default function BrowseRooms() {
  const navigate = useNavigate();
  const [rooms] = useState(generateMockRooms);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? rooms.filter((r) => r.vibes.includes(filter)) : rooms;

  const getTimeColor = (ms: number) => {
    const min = ms / 60000;
    if (min > 30) return "text-whisper-emerald";
    if (min > 10) return "text-whisper-amber";
    return "text-whisper-red";
  };

  return (
    <div className="bg-page relative min-h-screen overflow-hidden">
      <BackgroundParticles />

      <nav className="relative z-10 flex items-center gap-4 px-6 py-4">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <Ghost className="h-5 w-5 text-primary" />
          <span className="font-bold">Browse Rooms</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              !filter ? "gradient-bg text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {roomVibes.map((v) => (
            <button
              key={v}
              onClick={() => setFilter(v === filter ? null : v)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === v ? "gradient-bg text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Room grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Ghost className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No active rooms right now. Be the first to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((room, i) => (
              <motion.div
                key={room.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 cursor-pointer group hover:bg-[hsl(var(--glass-hover))] transition-all"
                onClick={() => navigate(`/room/${room.code}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{room.name}</h3>
                  <span className={`text-xs font-mono ${getTimeColor(room.remainingMs)}`}>
                    <Clock className="h-3 w-3 inline mr-1" />
                    {Math.floor(room.remainingMs / 60000)}m
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {room.vibes.map((v) => (
                    <span key={v} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {v}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {room.participants}/{room.maxParticipants} shadows
                  </span>
                  <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Join <Sparkles className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
