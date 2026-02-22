import { formatTimeRemaining, getTimerColor, getTimerUrgency } from "@/utils/timeUtils";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  remaining: number;
}

export function CountdownTimer({ remaining }: CountdownTimerProps) {
  const color = getTimerColor(remaining);
  const urgency = getTimerUrgency(remaining);
  const totalDuration = 60 * 60 * 1000;
  const progress = remaining / totalDuration;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
          <motion.circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ filter: urgency === "critical" ? `drop-shadow(0 0 8px ${color})` : undefined }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono text-lg font-bold"
            style={{ color }}
            animate={urgency === "critical" ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {formatTimeRemaining(remaining)}
          </motion.span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">remaining</p>
    </div>
  );
}
