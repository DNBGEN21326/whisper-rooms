import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface JoinRoomInputProps {
  onJoin: (code: string) => void;
}

export function JoinRoomInput({ onJoin }: JoinRoomInputProps) {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length >= 4) onJoin(code.trim().toUpperCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="mt-8 max-w-md mx-auto"
    >
      <p className="text-muted-foreground text-sm mb-3 text-center">Or join an existing room</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter room code..."
          maxLength={6}
          className="flex-1 rounded-xl glass px-4 py-3 font-mono text-center text-lg tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={code.trim().length < 4}
          className="gradient-bg rounded-xl px-5 py-3 text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-all"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </motion.div>
  );
}
