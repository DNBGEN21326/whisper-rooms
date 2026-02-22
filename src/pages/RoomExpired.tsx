import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Ghost, Plus, Home } from "lucide-react";
import { BackgroundParticles } from "@/components/shared/BackgroundParticles";

export default function RoomExpired() {
  const navigate = useNavigate();

  return (
    <div className="bg-page relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundParticles />

      <div className="relative z-10 text-center px-6 max-w-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto mb-8"
        >
          <div className="h-24 w-24 mx-auto rounded-full glass flex items-center justify-center">
            <Ghost className="h-12 w-12 text-muted-foreground" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          This room has been{" "}
          <span className="gradient-text-magenta">erased from existence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground mb-10"
        >
          All messages, identities, and connections have been permanently destroyed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 gradient-bg rounded-full px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" />
            Create a New Room
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 glass rounded-full px-6 py-3 font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            Return Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
