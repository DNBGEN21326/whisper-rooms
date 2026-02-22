import { useState } from "react";
import { Send, Smile } from "lucide-react";
import { motion } from "framer-motion";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const emojiList = ["😀", "😂", "🥲", "😍", "🤔", "😎", "🔥", "❤️", "👀", "💀", "🎭", "👻", "✨", "🌙", "⚡"];

export function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const insertEmoji = (emoji: string) => {
    setText((prev) => prev + emoji);
    setShowEmoji(false);
  };

  return (
    <div className="relative">
      {showEmoji && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 left-0 glass rounded-xl p-3 flex flex-wrap gap-2 max-w-xs"
        >
          {emojiList.map((e) => (
            <button
              key={e}
              onClick={() => insertEmoji(e)}
              className="text-xl hover:scale-125 transition-transform"
            >
              {e}
            </button>
          ))}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="glass rounded-2xl flex items-center gap-2 p-2">
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-secondary"
        >
          <Smile className="h-5 w-5" />
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Whisper something..."
          maxLength={500}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm"
        />

        {text.length > 400 && (
          <span className="text-xs text-muted-foreground">{500 - text.length}</span>
        )}

        <button
          type="submit"
          disabled={!text.trim()}
          className="gradient-bg rounded-xl p-2.5 text-primary-foreground disabled:opacity-30 hover:opacity-90 transition-all"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
