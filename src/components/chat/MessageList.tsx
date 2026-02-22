import { useRef, useEffect, useState } from "react";
import { ChatMessage, Participant } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChevronDown } from "lucide-react";

interface MessageListProps {
  messages: ChatMessage[];
  participants: Participant[];
  onReaction: (messageId: string, emoji: string) => void;
}

export function MessageList({ messages, participants, onReaction }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (isNearBottom) scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 120);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const getParticipant = (id: string) => participants.find((p) => p.id === id);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          participant={getParticipant(msg.participantId)}
          isOwn={msg.participantId === "me"}
          onReaction={(emoji) => onReaction(msg.id, emoji)}
        />
      ))}
      <div ref={endRef} />

      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="sticky bottom-2 left-1/2 -translate-x-1/2 glass rounded-full p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
