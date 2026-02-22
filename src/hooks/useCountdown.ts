import { useState, useEffect, useCallback } from "react";

export function useCountdown(durationMs: number = 60 * 60 * 1000) {
  const [endTime] = useState(() => Date.now() + durationMs);
  const [remaining, setRemaining] = useState(durationMs);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const r = Math.max(0, endTime - Date.now());
      setRemaining(r);
      if (r <= 0) {
        setIsExpired(true);
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const forceExpire = useCallback(() => {
    setRemaining(0);
    setIsExpired(true);
  }, []);

  return { remaining, isExpired, forceExpire };
}
