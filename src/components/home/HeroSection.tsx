import { motion } from "framer-motion";
import { Ghost, Sparkles, Clock, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onCreateRoom: () => void;
}

export function HeroSection({ onCreateRoom }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-6 inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground">
          <Ghost className="h-4 w-4" />
          <span>Anonymous • Ephemeral • Free</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
      >
        Speak Freely.{" "}
        <span className="gradient-text">Vanish Completely.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10"
      >
        Create anonymous chat rooms that self-destruct in 60 minutes. 
        No accounts. No traces. No identity.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={onCreateRoom}
          className="gradient-bg glow-pulse rounded-full px-8 py-4 font-semibold text-primary-foreground text-lg flex items-center gap-2 hover:opacity-90 transition-all"
        >
          <Sparkles className="h-5 w-5" />
          Create a Whisper Room
        </button>
      </motion.div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        {[
          { icon: Ghost, title: "Create or Join", desc: "Generate a room or enter a code to join one" },
          { icon: Sparkles, title: "Stay Anonymous", desc: "Get a random identity — no sign-up needed" },
          { icon: Clock, title: "Room Self-Destructs", desc: "Everything vanishes after 60 minutes" },
        ].map((item, i) => (
          <div key={i} className="glass rounded-2xl p-6 text-center glass-hover transition-all cursor-default group">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg opacity-80 group-hover:opacity-100 transition-opacity">
              <item.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
