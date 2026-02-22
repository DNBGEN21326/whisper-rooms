import { useState, useCallback } from "react";
import { generateIdentity } from "@/utils/identityGenerator";

export interface Identity {
  name: string;
  color: string;
  avatarSeed: number;
}

export function useAnonymousIdentity() {
  const [identity, setIdentity] = useState<Identity | null>(null);

  const generateNewIdentity = useCallback(() => {
    const newIdentity = generateIdentity();
    setIdentity(newIdentity);
    return newIdentity;
  }, []);

  return { identity, generateNewIdentity };
}
