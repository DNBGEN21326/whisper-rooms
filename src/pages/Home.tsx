import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundParticles } from "@/components/shared/BackgroundParticles";
import { HeroSection } from "@/components/home/HeroSection";
import { JoinRoomInput } from "@/components/home/JoinRoomInput";
import { CreateRoomModal } from "@/components/home/CreateRoomModal";
import { Ghost } from "lucide-react";

export default function Home() {
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();

  const handleRoomCreated = (code: string) => {
    navigate(`/room/${code}`);
  };

  const handleJoin = (code: string) => {
    navigate(`/room/${code}`);
  };

  return (
    <div className="bg-page relative min-h-screen overflow-hidden">
      <BackgroundParticles />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Ghost className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Whisper Rooms</span>
        </div>
        <button
          onClick={() => navigate("/browse")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Browse Rooms
        </button>
      </nav>

      <div className="relative z-10">
        <HeroSection onCreateRoom={() => setShowCreate(true)} />
        <JoinRoomInput onJoin={handleJoin} />
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 text-xs text-muted-foreground">
        <p>All conversations are ephemeral. Nothing is stored. Nothing remains.</p>
      </footer>

      <CreateRoomModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onRoomCreated={handleRoomCreated}
      />
    </div>
  );
}
