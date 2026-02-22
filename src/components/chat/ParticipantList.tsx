import { Participant } from "@/hooks/useChat";
import { AnonymousAvatar } from "@/components/identity/AnonymousAvatar";

interface ParticipantListProps {
  participants: Participant[];
}

export function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
        {participants.length} Shadow{participants.length !== 1 ? "s" : ""} in this room
      </p>
      <div className="space-y-2">
        {participants.map((p) => (
          <div key={p.id} className="flex items-center gap-2.5 py-1">
            <div className="relative">
              <AnonymousAvatar seed={p.avatarSeed} color={p.color} size={28} />
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${
                  p.isOnline ? "bg-whisper-emerald" : "bg-muted-foreground"
                }`}
              />
            </div>
            <span className="text-sm truncate" style={{ color: p.color }}>
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
