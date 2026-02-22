import { motion } from "framer-motion";
import { ChatMessage, Participant } from "@/hooks/useChat";
import { AnonymousAvatar } from "@/components/identity/AnonymousAvatar";
import { relativeTime } from "@/utils/timeUtils";

interface MessageBubbleProps {
  message: ChatMessage;
  participant?: Participant;
  isOwn: boolean;
  onReaction: (emoji: string) => void;
}

const quickReactions = ["❤️", "😂", "🔥", "👀", "💀"];

export function MessageBubble({ message, participant, isOwn, onReaction }: MessageBubbleProps) {
  if (message.type === "system") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-2"
      >
        <span className="text-xs text-muted-foreground italic">{message.text}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`flex gap-2.5 group ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {participant && !isOwn && (
        <AnonymousAvatar seed={participant.avatarSeed} color={participant.color} size={32} />
      )}

      <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
        {!isOwn && participant && (
          <span className="text-xs font-medium mb-1 ml-1" style={{ color: participant.color }}>
            {participant.name}
          </span>
        )}

        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isOwn
              ? "gradient-bg text-primary-foreground rounded-br-md"
              : "glass rounded-bl-md"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>

        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[10px] text-muted-foreground">{relativeTime(message.timestamp)}</span>

          {/* Reactions */}
          {message.reactions && Object.entries(message.reactions).length > 0 && (
            <div className="flex gap-1">
              {Object.entries(message.reactions).map(([emoji, users]) => (
                <button
                  key={emoji}
                  onClick={() => onReaction(emoji)}
                  className={`text-xs glass rounded-full px-1.5 py-0.5 hover:bg-secondary transition-colors ${
                    users.includes("me") ? "ring-1 ring-primary" : ""
                  }`}
                >
                  {emoji} {users.length}
                </button>
              ))}
            </div>
          )}

          {/* Quick reaction picker on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
            {quickReactions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onReaction(emoji)}
                className="text-xs hover:scale-125 transition-transform p-0.5"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
