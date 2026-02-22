import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Identity } from "@/hooks/useAnonymousIdentity";
import { AnonymousAvatar } from "./AnonymousAvatar";

interface IdentityRevealProps {
  identity: Identity;
  onEnterRoom: () => void;
}

export function IdentityReveal({ identity, onEnterRoom }: IdentityRevealProps) {
  const [phase, setPhase] = useState<"generating" | "revealed">("generating");

  useEffect(() => {
    const t = setTimeout(() => setPhase("revealed"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-page fixed inset-0 z-50 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === "generating" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-6 h-16 w-16 rounded-full border-2 border-transparent gradient-bg"
              style={{ borderTopColor: "transparent", clipPath: "inset(0 0 50% 0)" }}
            />
            <div className="mx-auto mb-6 h-16 w-16 rounded-full gradient-bg animate-pulse" />
            <p className="text-muted-foreground text-lg">Generating your identity...</p>
          </motion.div>
        )}

        {phase === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center px-6"
          >
            <p className="text-muted-foreground mb-6 text-sm uppercase tracking-widest">
              Your identity for this room
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-6"
            >
              <AnonymousAvatar seed={identity.avatarSeed} color={identity.color} size={80} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold mb-4"
              style={{ color: identity.color }}
            >
              {identity.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground mb-10 max-w-sm mx-auto text-sm"
            >
              This identity exists only in this room and will vanish when the room expires.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={onEnterRoom}
              className="gradient-bg px-8 py-3 rounded-full font-semibold text-primary-foreground glow-violet hover:opacity-90 transition-opacity"
            >
              Enter Room →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
