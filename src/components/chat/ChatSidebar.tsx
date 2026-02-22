import { CountdownTimer } from "./CountdownTimer";
import { ParticipantList } from "./ParticipantList";
import { Participant } from "@/hooks/useChat";
import { Copy, Check, Share2, LogOut, X } from "lucide-react";
import { useState } from "react";

interface ChatSidebarProps {
  roomName: string;
  roomCode: string;
  remaining: number;
  participants: Participant[];
  onLeave: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function ChatSidebar({ roomName, roomCode, remaining, participants, onLeave, onClose, isMobile }: ChatSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col h-full ${isMobile ? "p-5" : "p-4"} gap-6`}>
      {isMobile && (
        <button onClick={onClose} className="self-end text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      )}

      <div className="text-center">
        <h2 className="font-bold text-lg gradient-text">{roomName}</h2>
      </div>

      <CountdownTimer remaining={remaining} />

      <div className="flex items-center justify-center gap-2">
        <span className="font-mono text-sm text-muted-foreground tracking-widest">{roomCode}</span>
        <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="h-4 w-4 text-whisper-emerald" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ParticipantList participants={participants} />
      </div>

      <button
        onClick={onLeave}
        className="flex items-center justify-center gap-2 glass rounded-xl py-2.5 text-sm text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
      >
        <LogOut className="h-4 w-4" />
        Leave Room
      </button>
    </div>
  );
}
