import { useState, useCallback, useEffect, useRef } from "react";
import { mockParticipants, mockMessages, simulatedIncomingMessages } from "@/data/mockMessages";
import { Identity } from "@/hooks/useAnonymousIdentity";

export interface Participant {
  id: string;
  name: string;
  color: string;
  avatarSeed: number;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  participantId: string;
  text: string;
  timestamp: number;
  type: "message" | "system";
  reactions?: Record<string, string[]>;
}

export function useChat(identity: Identity | null) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const msgIndexRef = useRef(0);

  const myParticipant: Participant | null = identity
    ? { id: "me", name: identity.name, color: identity.color, avatarSeed: identity.avatarSeed, isOnline: true }
    : null;

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      participantId: "me",
      text: text.trim(),
      timestamp: Date.now(),
      type: "message",
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        const reactions = { ...(m.reactions || {}) };
        if (reactions[emoji]?.includes("me")) {
          reactions[emoji] = reactions[emoji].filter((id) => id !== "me");
          if (reactions[emoji].length === 0) delete reactions[emoji];
        } else {
          reactions[emoji] = [...(reactions[emoji] || []), "me"];
        }
        return { ...m, reactions };
      })
    );
  }, []);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (msgIndexRef.current >= simulatedIncomingMessages.length) {
        msgIndexRef.current = 0;
      }

      const sender = participants.filter((p) => p.id !== "me")[Math.floor(Math.random() * (participants.length - 1))];
      if (!sender) return;

      setTypingUser(sender.name);

      setTimeout(() => {
        setTypingUser(null);
        const text = simulatedIncomingMessages[msgIndexRef.current];
        msgIndexRef.current++;
        const msg: ChatMessage = {
          id: `sim-${Date.now()}`,
          participantId: sender.id,
          text,
          timestamp: Date.now(),
          type: "message",
        };
        setMessages((prev) => [...prev, msg]);
      }, 2000 + Math.random() * 2000);
    }, 12000 + Math.random() * 8000);

    return () => clearInterval(interval);
  }, [participants]);

  const allParticipants = myParticipant ? [myParticipant, ...participants] : participants;

  return { messages, participants: allParticipants, typingUser, sendMessage, addReaction };
}
