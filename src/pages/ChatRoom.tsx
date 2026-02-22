import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { IdentityReveal } from "@/components/identity/IdentityReveal";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useCountdown } from "@/hooks/useCountdown";
import { useAnonymousIdentity } from "@/hooks/useAnonymousIdentity";
import { useChat } from "@/hooks/useChat";
import { roomNames } from "@/data/mockMessages";
import { getTimerUrgency, formatTimeRemaining } from "@/utils/timeUtils";

export default function ChatRoom() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"identity" | "chat">("identity");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { identity, generateNewIdentity } = useAnonymousIdentity();
  const { remaining, isExpired } = useCountdown(60 * 60 * 1000);
  const { messages, participants, typingUser, sendMessage, addReaction } = useChat(identity);

  const roomName = roomNames[Math.floor(Math.random() * roomNames.length)];

  useEffect(() => {
    if (!identity) generateNewIdentity();
  }, [identity, generateNewIdentity]);

  useEffect(() => {
    if (isExpired) navigate("/expired");
  }, [isExpired, navigate]);

  // System messages for time warnings
  useEffect(() => {
    const minutes = remaining / 60000;
    // These are handled by the timer display; skip for now
  }, [remaining]);

  if (phase === "identity" && identity) {
    return <IdentityReveal identity={identity} onEnterRoom={() => setPhase("chat")} />;
  }

  const urgency = getTimerUrgency(remaining);

  return (
    <div className="bg-page flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-card/50 backdrop-blur-sm">
        <ChatSidebar
          roomName={roomName}
          roomCode={code || "UNKNOWN"}
          remaining={remaining}
          participants={participants}
          onLeave={() => navigate("/")}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-80 bg-card border-r border-border h-full">
              <ChatSidebar
                roomName={roomName}
                roomCode={code || "UNKNOWN"}
                remaining={remaining}
                participants={participants}
                onLeave={() => navigate("/")}
                onClose={() => setSidebarOpen(false)}
                isMobile
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border glass">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-semibold truncate gradient-text">{roomName}</h1>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="text-xs font-mono px-2 py-1 rounded-full glass"
              style={{
                color: urgency === "critical" ? "hsl(var(--whisper-red))" :
                       urgency === "urgent" ? "hsl(var(--whisper-amber))" :
                       "hsl(var(--muted-foreground))"
              }}
            >
              ⏳ {formatTimeRemaining(remaining)}
            </span>
            <span className="text-xs text-muted-foreground">{participants.length} online</span>
          </div>
        </div>

        {/* Messages */}
        <MessageList
          messages={messages}
          participants={participants}
          onReaction={addReaction}
        />

        {/* Typing indicator */}
        <AnimatePresence>
          {typingUser && <TypingIndicator userName={typingUser} />}
        </AnimatePresence>

        {/* Input */}
        <div className="p-4 pt-0">
          <MessageInput onSend={sendMessage} />
        </div>
      </div>
    </div>
  );
}
