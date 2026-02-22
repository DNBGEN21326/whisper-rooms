import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Users } from "lucide-react";
import { generateRoomCode } from "@/utils/identityGenerator";
import { roomNames, roomVibes } from "@/data/mockMessages";

interface CreateRoomModalProps {
  open: boolean;
  onClose: () => void;
  onRoomCreated: (code: string) => void;
}

export function CreateRoomModal({ open, onClose, onRoomCreated }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(20);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    const code = generateRoomCode();
    setCreatedCode(code);
  };

  const handleCopy = () => {
    if (!createdCode) return;
    navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnter = () => {
    if (createdCode) onRoomCreated(createdCode);
  };

  const toggleVibe = (v: string) => {
    setSelectedVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const placeholder = roomNames[Math.floor(Math.random() * roomNames.length)];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass rounded-2xl p-6 sm:p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">Create a Whisper Room</h2>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {!createdCode ? (
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Room Name (optional)</label>
                  <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-lg bg-secondary border border-border px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Max Participants: <span className="text-foreground font-medium">{maxParticipants}</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={50}
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>2</span><span>50</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Vibe / Topic</label>
                  <div className="flex flex-wrap gap-2">
                    {roomVibes.map((v) => (
                      <button
                        key={v}
                        onClick={() => toggleVibe(v)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedVibes.includes(v)
                            ? "gradient-bg text-primary-foreground"
                            : "glass text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  className="w-full gradient-bg rounded-xl py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Generate Room
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <p className="text-muted-foreground text-sm">Your room is ready! Share this code:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-3xl font-bold tracking-[0.3em] gradient-text">{createdCode}</span>
                  <button onClick={handleCopy} className="glass rounded-lg p-2 hover:bg-secondary transition-colors">
                    {copied ? <Check className="h-5 w-5 text-whisper-emerald" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                  </button>
                </div>
                <button
                  onClick={handleEnter}
                  className="w-full gradient-bg rounded-xl py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Enter Room →
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
